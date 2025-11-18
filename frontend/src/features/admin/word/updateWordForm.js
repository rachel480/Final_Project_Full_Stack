import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useGetWordByIdQuery, useUpdateWordMutation } from "../../word/wordApi";
import { useGetAllCategoriesQuery } from "../../category/categoryApi";
import FormContainer from "../../../components/formContainer";
import SectionTitle from "../../../components/sectionTitle";
import FormInput from "../../../components/formInput";
import FormSelect from "../../../components/formSelect";
import SubmitButton from "../../../components/submitButton";
import BackButton from "../../../components/backButton";
import { Box } from "@mui/material";
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const updateWordSchema = z.object({
  word: z.string({ required_error: "חובה להכניס מילה" }).min(1, "חובה להכניס מילה"),
  translation: z.string({ required_error: "חובה להכניס תרגום" }).min(1, "חובה להכניס תרגום"),
  categoryName: z.string({ required_error: "חובה לבחור שם קטגוריה" }).min(1, "חובה לבחור קטגוריה"),
})

const UpdateWordForm = () => {
  const { wordId, categoryId, courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: word, isLoading, error } = useGetWordByIdQuery(wordId)
  const { data: categories } = useGetAllCategoriesQuery()
  const [updateWord] = useUpdateWordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateWordSchema),
    defaultValues: { word: "", translation: "", categoryName: "" },
  })

  useEffect(() => {
    if (word) {
      reset({
        word: word.word,
        translation: word.translation,
        categoryName: word.categoryName,
      })
    }
  }, [word, reset])

  if (isLoading) return <LoadingSpinner text="טוען מילה"/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!word) return <InfoMessage message="לא נמצאה מילה"/>
  const onSubmit = async (data) => {
    try {

      await updateWord({ id: wordId, ...data }).unwrap()

      toast.success(`המילה עודכנה בהצלחה`, {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate(location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}`)
      })

    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || "העדכון נכשל", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)]">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BackButton
          navigation={
            location.state?.from ||
            `/user/admin/data/courses/${courseId}/category/${categoryId}`
          }
        />

        <div className="mt-8">
          <SectionTitle text={`Update word: ${word.word}`} />
        </div>

        <FormInput
          label="Word"
          type="text"
          register={register("word")}
          error={errors.word?.message}
          placeholder="הכנס מילה..."
          htmlFor="word"
        />

        <FormInput
          label="Translation"
          type="text"
          register={register("translation")}
          error={errors.translation?.message}
          placeholder="הכנס תרגום..."
          htmlFor="translation"
        />

        <FormSelect
          label="Category"
          id="categoryName"
          register={register("categoryName")}
          error={errors.categoryName?.message}
          options={(categories || []).map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          defaultOption="-- בחר קטוגריה--"
        />

        <SubmitButton text="Save" isLoading={isSubmitting} className="mt-6" />

      </FormContainer>
    </Box>
  )
}

export default UpdateWordForm