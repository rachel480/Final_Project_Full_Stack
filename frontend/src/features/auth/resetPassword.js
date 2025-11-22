import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "./authApi";
import { toast } from "react-toastify";

import FormContainer from "../../components/formContainer";
import FormInput from "../../components/formInput";
import SubmitButton from "../../components/submitButton";
import FormTitle from "../../components/formTitle";

import { z } from "zod";
import validPassword from "./service/validPassword";
import PasswordInput from "../../components/passwordInput";

const resetPasswordSchema = z.object({
  password: z.string({ required_error: "חובה להכניס סיסמא" }).min(8, "סיסמא חייבת להכיל לפחות 8 תווים").refine(val => validPassword(val), { message: "סיסמא חייבת להכיל אות  גדולה , קטנה ותו מיוחד" }),
  confirmPassword: z.string({ required_error: "חובה לאמת סיסמא" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "סיסמאת האימות אינה תואמת את הסיסמא"
  })

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  })

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        token,
        password: data.password,
      }).unwrap()

      toast.success(res?.message || "הסיסמה אופסה בהצלחה!", {
        position: "top-right",
        autoClose: 2500,
        onClose: () => navigate("/login")
      })

    } catch (err) {
      toast.error(err?.data?.message || "שגיאה באיפוס סיסמה", {
        position: "top-right",
        autoClose: 2500,
      })
    }
  }

  return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>

          <FormTitle text="איפוס סיסמא" />

          <PasswordInput
            label="סיסמה חדשה"
            register={register("password")}
            error={errors.password?.message}
            placeholder="הכנס סיסמה חדשה..."
            htmlFor="password"
          />

          <PasswordInput
            label="אימות סיסמה"
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="אימות סיסמה..."
            htmlFor="confirmPassword"
          />

          <SubmitButton text="אפס" isLoading={isLoading} />

        </FormContainer>
  )
}

export default ResetPassword
