import { useEffect } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import {
  useGetFullCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../category/categoryApi"
import { useGetAllCoursesQuery } from "../../course/courseApi"
import NavigateButton from "../../../components/navigateButton"

const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  course: z.string().min(1, "Course is required"),
})

const UpdateCategoryForm = () => {
  const { categoryId, courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)
  const { data: courses } = useGetAllCoursesQuery()
  const [updateCategory] = useUpdateCategoryMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: "", course: "" },
  })

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        course: category.course?._id || "",
      })
    }
  }, [category, reset])

  if (isLoading) return <p>Loading category...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!category) return <p>No category found</p>

  const onSubmit = async (data) => {
    try {
      await updateCategory({ id: categoryId, ...data }).unwrap()
      toast.success(`Category "${data.name}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })
      setTimeout(() => {
        const from = location.state?.from || `/user/admin/data/courses/${courseId}`
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
        <NavigateButton buttonText={'🔙'} navigation={location.state?.from || `/user/admin/data/courses/${courseId}`}/>
      <h2>
        <strong>Update category:</strong> {category.name}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 15 }}
      >
        {/* Category Name */}
        <label style={{ fontWeight: "bold" }}>Category Name</label>
        <input
          type="text"
          {...register("name")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        {/* Course */}
        <label style={{ fontWeight: "bold" }}>Course</label>
        <select
          {...register("course")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        >
          <option value="">-- Select Course --</option>
          {(courses || []).map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.course && <p style={{ color: "red" }}>{errors.course.message}</p>}

        {/* Challenge link */}
        <label style={{ fontWeight: "bold" }}>Challenge</label>
        {category.challenge ? (
          <Link
   to={`/user/admin/data/courses/${category.course._id}/category/${category._id}/challenge/${category.challenge._id}/update`}
            state={{ from: location.pathname }}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Challenge
          </Link>
        ) : (
          <p style={{ color: "gray" }}>No challenge linked</p>
        )}

        {/* Words list */}
        <label style={{ fontWeight: "bold" }}>Words</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(category.words || []).length > 0 ? (
            category.words.map((word) => (
              <Link
                key={word._id}
                to={`/user/admin/data/courses/${category.course._id}/category/${category._id}/words/${word._id}/update`}
                state={{ from: location.pathname }}
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                {word.word}
              </Link>
            ))
          ) : (
            <p style={{ color: "gray" }}>No words in this category</p>
          )}
        </div>

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

export default UpdateCategoryForm