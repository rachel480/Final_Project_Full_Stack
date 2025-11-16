import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetSingleUserQuery, useUpdateUserByAdminMutation } from "../../user/userApi"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import FormContainer from "../../../components/formContainer"
import SectionTitle from "../../../components/sectionTitle"
import SubmitButton from "../../../components/submitButton"
import BackButton from "../../../components/backButton"
import DashedBox from "../../../components/dashedBox"
import FormSelect from "../../../components/formSelect"
import { Box } from "@mui/material";

const updateUserSchema = z.object({
  roles: z.array(z.enum(["User", "Admin"])),
  active: z.coerce.boolean(),
})

const UpdateUserForm = () => {
  const { userId } = useParams()
  const { data: user, isLoading, error } = useGetSingleUserQuery(userId)
  const [updateUserByAdmin] = useUpdateUserByAdminMutation()

  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      roles: [],
      active: true,
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        roles: user.roles,
        active: user.active,
      })
    }
  }, [user, reset])

  if (isLoading) return <p className="text-gray-500 text-center mt-8">טוען משתמש</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "משהו השתבש"}</p>
  if (!user) return <p className="text-gray-500 text-center mt-8">לא נמצא משתמש</p>

  const onSubmit = async (data) => {
    try {
      await updateUserByAdmin({ id: userId, ...data }).unwrap()

      toast.success(`User "${user.userName}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
        onClose:()=>navigate("/user/admin/users")
      })

    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || "Update failed" , {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)]">
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <BackButton navigation="/user/admin/users" />

      <div className="mt-8">
        <SectionTitle text={`Update user: ${user.userName}`} />
      </div>

      <DashedBox className="flex-col items-start mt-4">
        <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">Roles:</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" value="User" {...register("roles")} className="accent-orange-400" /> User
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value="Admin" {...register("roles")} className="accent-orange-400" /> Admin
          </label>
        </div>
      </DashedBox>

      <FormSelect
        label="Active"
        id="active"
        register={register("active", { setValueAs: value => value === "true" })}
        options={[
          { value: "true", label: "true" },
          { value: "false", label: "false" },
        ]}
        defaultOption="-- Select Active Status --"
      />

      <SubmitButton text="Save" isLoading={false} className="mt-6" />

    </FormContainer>
    </Box>
  )
}

export default UpdateUserForm