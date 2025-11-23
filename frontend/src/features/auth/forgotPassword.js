import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "./authApi";
import { toast } from "react-toastify";
import FormContainer from "../../components/formContainer";
import FormInput from "../../components/formInput";
import SubmitButton from "../../components/submitButton";
import FormTitle from "../../components/formTitle";
import CustomLink from "../../components/customLink";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "חובה להכניס מייל" })
    .email("כתובת מייל לא תקינה"),
})

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword({email:data.email}).unwrap()

      toast.success(res?.message || "אם המייל קיים — נשלח קישור לאיפוס", {
        position: "top-right",
        autoClose: 3000,
      })

    } catch (err) {
      toast.error(err?.message || "משהו השתבש... נסה שוב", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>

          <FormTitle text="שחזור סיסמא" />

          <FormInput
            label="מייל"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="הכנס כתובת מייל..."
            htmlFor="email"
          />

          <SubmitButton text="שלח" isLoading={isLoading} />

          <p className="mt-4 text-center text-sm">
            נזכרת בסיסמא?{" "}
            <CustomLink to="/login">חזרה לכניסה</CustomLink>
          </p>

        </FormContainer>
  )
}

export default ForgotPassword