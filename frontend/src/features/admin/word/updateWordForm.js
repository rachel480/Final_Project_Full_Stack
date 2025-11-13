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

const updateWordSchema = z.object({
  word: z.string().min(1, "Word is required"),
  translation: z.string().min(1, "Translation is required"),
  categoryName: z.string().min(1, "Category is required"),
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

  if (isLoading)
    return <p className="text-gray-500 text-center mt-8">טוען מילה...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "משהו השתבש"}</p>
  if (!word) return <p className="text-gray-500 text-center mt-8">לא נמצאה מילה</p>

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
          placeholder="Enter word..."
          htmlFor="word"
        />

        <FormInput
          label="Translation"
          type="text"
          register={register("translation")}
          error={errors.translation?.message}
          placeholder="Enter translation..."
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
          defaultOption="-- Select Category --"
        />

        <SubmitButton text="Save" isLoading={isSubmitting} className="mt-6" />

      </FormContainer>
    </Box>
  )
}

export default UpdateWordForm