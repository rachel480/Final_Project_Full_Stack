import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import {useGetWordByIdQuery,useUpdateWordMutation,} from "../../word/wordApi"
import { useGetAllCategoriesQuery } from "../../category/categoryApi"
import NavigateButton from "../../../components/navigateButton"

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
    formState: { errors },
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

  if (isLoading) return <p>Loading word...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!word) return <p>No word found</p>

  const onSubmit = async (data) => {
    try {
      await updateWord({ id: wordId, ...data }).unwrap()
      toast.success(`Word "${data.word}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })

      setTimeout(() => {
        const from =
          location.state?.from ||
          `/user/admin/data/courses/${courseId}/category/${categoryId}`
        navigate(from)
      }, 3000)
    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <NavigateButton
        buttonText="🔙"
        navigation={
          location.state?.from ||
          `/user/admin/data/courses/${courseId}/category/${categoryId}`
        }
      />

      <h2>
        <strong>Update Word:</strong> {word.word}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 15,
        }}
      >
        {/* Word */}
        <label style={{ fontWeight: "bold" }}>Word</label>
        <input
          type="text"
          {...register("word")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        {errors.word && <p style={{ color: "red" }}>{errors.word.message}</p>}

        {/* Translation */}
        <label style={{ fontWeight: "bold" }}>Translation</label>
        <input
          type="text"
          {...register("translation")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        {errors.translation && (
          <p style={{ color: "red" }}>{errors.translation.message}</p>
        )}

        <label style={{ fontWeight: "bold" }}>Category</label>
        <select
          {...register("categoryName")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        >
          <option value="">-- Select Category --</option>
          {(categories || []).map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryName && (
          <p style={{ color: "red" }}>{errors.category.message}</p>
        )}

        {/* Save button */}
        <button
          type="submit"
          style={{
            marginTop: 10,
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default UpdateWordForm