import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setWordInfo, goToStep } from "./wordWizardSlice";
import FormInput from "../../../components/formInput";
import FormContainer from "../../../components/formContainer";
import FormTitle from "../../../components/formTitle";
import SubmitButton from "../../../components/submitButton";
import FileInput from "../../../components/fileInput";

const AddWordForm = ({ categoryWords = [], categoryId }) => {
  const dispatch = useDispatch()

  const wordSchema = z.object({
    word: z
      .string({ required_error: "חובה להכניס מילה" })
      .nonempty("חובה להכניס מילה")
      .refine(
        (val) =>
          !categoryWords.some((w) => w.word.toLowerCase() === val.toLowerCase()),
        { message: "המילה כבר קיימת בקטגוריה הזו!" }
      ),

    translation: z
      .string({ required_error: "חובה להכניס תרגום" })
      .nonempty("חובה להכניס תרגום"),

    img: z
      .any()
      .refine(
        (files) => files instanceof FileList && files.length > 0,
        "התמונה חובה"
      ),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(wordSchema),
  })

  const onSubmit = (data) => {
    const file = data.img[0]

    dispatch(
      setWordInfo({
        word: data.word,
        translation: data.translation,
        img: file,
        categoryId,
      })
    )

    dispatch(goToStep(2));
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

      <FileInput label="תמונה" register={register} name="img" error={errors.img?.message}/>

      <SubmitButton text="שמירה" isLoading={isSubmitting} className="mt-4" />
    </FormContainer>
  )
}

export default AddWordForm;