import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddContactMessageMutation } from "./contactApi";
import { toast } from "react-toastify";
import FormContainer from "../../components/formContainer";
import FormInput from "../../components/formInput";
import FormTitle from "../../components/formTitle";
import SubmitButton from "../../components/submitButton";
import { z } from "zod";

 const contactSchema = z.object({
  name: z.string({ required_error: "חובה להכניס שם מלא" }).min(1, "שם מלא חייב להכיל לפחות תו 1"),
  email: z.string({ required_error: "חובה להכניס אימייל" }).nonempty("חובה להכניס אימייל").email("אימייל לא חוקי"),
  subject: z.string({required_error:"חובה להכניס נושא"}).min(2, "נא להזין נושא"),
  message: z.string({required_error:"חובה לשלוח הודעה"}).min(5, "הודעה חייבת להכיל לפחות 5 תווים"),
})

const ContactForm = () => {
  const [addContactMessage, { isLoading }] = useAddContactMessageMutation()

   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data) => {
    try {
      const res = await addContactMessage(data).unwrap()
      toast.success(res.message || "ההודעה נשלחה בהצלחה!")
      reset()
    } catch (err) {
      toast.error(err?.data?.message || "אירעה שגיאה בשליחה")
    }
  };

  return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <FormTitle text="צור קשר" />

          <FormInput
            label="שם מלא"
            type="text"
            register={register("name")}
            error={errors.name?.message}
            placeholder="הכנס שם מלא..."
            htmlFor="name"
          />

          <FormInput
            label="אימייל"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="הכנס אימייל..."
            htmlFor="email"
          />

          <FormInput
            label="נושא"
            type="text"
            register={register("subject")}
            error={errors.subject?.message}
            placeholder="הכנס נושא..."
            htmlFor="subject"
          />

          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="text-gray-700 mb-1">
              הודעה
            </label>
            <textarea
              {...register("message")}
              id="message"
              placeholder="כתוב כאן את ההודעה שלך..."
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <SubmitButton text="שלח הודעה" isLoading={isLoading} />

        </FormContainer>
    
  )
}

export default ContactForm