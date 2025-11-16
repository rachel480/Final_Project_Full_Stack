import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordMutation } from "./userApi";
import { toast } from "react-toastify";
import EditableFormInput from "../../components/editableFormInput"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/formContainer";
import FormTitle from "../../components/formTitle";
import SubmitButton from "../../components/submitButton";
import BackButton from "../../components/backButton";
import validPassword from "../auth/service/validPassword";


const passwordSchema = z.object({
  oldPassword: z.string({ required_error: "חובה להכניס סיסמא ישנה" }).min(8, "סיסמא חייבת להכיל לפחות 8 תוים"),
  newPassword: z.string({ required_error: "חובה להכניס סיסמא חדשה "}).min(8, "סיסמא חייבת להכיל לפחות 8 תוים")
    .refine(val => validPassword(val), { message: "סיסמא חייבת להכיל אות  גדולה , קטנה ותו מיוחד"}),
  confirmPassword: z.string({ required_error: "חובה לאמת סיסמא" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "!!סיסמאת האימות אינה תואמת את הסיסמא",
  path: ["confirmPassword"],
})

const ResetPasswordForm = () => {
  const userId = useSelector((state) => state.auth.user?.id)
  const [updatePassword,{isLoading}] = useUpdatePasswordMutation()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(passwordSchema)})

  const onSubmit = async (data) => {
    try {
      await updatePassword({ id: userId, oldPassword: data.oldPassword, newPassword: data.newPassword }).unwrap()

      toast.success("סיסמא אופסה בהצלחה", {
        position: "top-right",
        autoClose: 3000,
        onClose:()=>navigate("/user/profile")
      })

    } catch (err) {
      toast.error(err?.data?.message || "שגיאה באיפוס סיסמא!!", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>

      <BackButton navigation={'/user/profile'} />

      <FormTitle text={'איפוס סיסמא'}/>

      <EditableFormInput
        label="סיסמא ישנה"
        htmlFor="oldPassword"
        type="password"
        register={register("oldPassword")}
        error={errors.oldPassword?.message}
      />

      <EditableFormInput
        label="סיסמא חדשה"
        htmlFor="newPassword"
        type="password"
        register={register("newPassword")}
        error={errors.newPassword?.message}
      />

      <EditableFormInput
        label="אימות סיסמא חדשה"
        htmlFor="confirmPassword"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <SubmitButton text="אפס סיסמא" isLoading={isLoading} />

    </FormContainer>
  )
}

export default ResetPasswordForm
