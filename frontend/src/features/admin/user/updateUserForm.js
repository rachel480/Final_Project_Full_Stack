import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useGetSingleUserQuery, useUpdateUserByAdminMutation } from "../../user/userApi"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import NavigateButton from "../../../components/navigateButton"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import FormContainer from "../../../components/formContainer"
import SectionTitle from "../../../components/sectionTitle"
import SubmitButton from "../../../components/submitButton"
import BackButton from "../../../components/backButton"
import DashedBox from "../../../components/dashedBox"

const updateUserSchema = z.object({
  roles: z.array(z.enum(["User", "Admin"])),
  active: z.coerce.boolean(),
})

const UpdateUserForm = () => {
  const { userId } = useParams()
  const { data: user, isLoading, error } = useGetSingleUserQuery(userId)
  const [updateUserByAdmin] = useUpdateUserByAdminMutation()
  const [message, setMessage] = useState(null)
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

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading user...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "Something went wrong"}</p>
  if (!user) return <p className="text-gray-500 text-center mt-8">No user found</p>

  const onSubmit = async (data) => {
    try {
      await updateUserByAdmin({ id: userId, ...data }).unwrap()

      toast.success(`User "${user.userName}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })

      setTimeout(() => {
        navigate('/user/admin/users')
      }, 4000)
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: err?.data?.message || "Update failed" })
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <BackButton navigation="/user/admin/users" />

      <div className="mt-8">
        <SectionTitle text={`Update user: ${user.userName}`} />
      </div>

      {/* Roles */}
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

      {/* Active */}
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="active" className="font-semibold">Active</label>
        <select
          id="active"
          {...register("active", { setValueAs: value => value === "true" })}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>

      <SubmitButton text="Save" isLoading={false} className="mt-6" />

      {message && <p className={`mt-2 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>{message.text}</p>}
    </FormContainer>
  )
}

export default UpdateUserForm