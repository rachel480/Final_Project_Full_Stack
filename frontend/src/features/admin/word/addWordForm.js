import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { setWordInfo, goToStep } from "./wordWizardSlice"
import FormInput from "../../../components/formInput"
import FormContainer from "../../../components/formContainer"
import FormTitle from "../../../components/formTitle"
import SubmitButton from "../../../components/submitButton"

const AddWordForm = ({ categoryWords = [], categoryId }) => {
  const dispatch = useDispatch()

  const wordSchema = z.object({
    word: z.string({ required_error: "חובה להכניס מילה" })
      .nonempty("חובה להכניס מילה")
      .refine(
        (val) => !categoryWords.some((w) => w.word.toLowerCase() === val.toLowerCase()),
        { message: "המילה כבר קיימת בקטגוריה הזו!" }
      ),
    translation: z
      .string({ required_error: "חובה להכניס תרגום" })
      .nonempty("חובה להכניס תרגום"),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(wordSchema),
  })

  const onSubmit = (data) => {
    dispatch(setWordInfo({ ...data, categoryId }))
    dispatch(goToStep(2))
    reset()
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle text="הוספת מילה" />

      <FormInput
        label="מילה"
        type="text"
        register={register("word")}
        error={errors.word?.message}
        placeholder="הכנס מילה..."
        htmlFor="word"
      />

      <FormInput
        label="תרגום"
        type="text"
        register={register("translation")}
        error={errors.translation?.message}
        placeholder="הכנס תרגום..."
        htmlFor="translation"
      />

      <SubmitButton text="שמירה" className="mt-4" />
    </FormContainer>
  )
}

export default AddWordForm
