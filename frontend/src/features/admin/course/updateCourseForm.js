import { useEffect } from "react"
import { useParams, useNavigate, Link, useLocation } from "react-router-dom"
import { useGetFullCourseByIdQuery, useUpdateCourseMutation } from "../../course/courseApi"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import NavigateButton from "../../../components/navigateButton"

const updateCourseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  level: z.enum(["Easy", "Medium", "Hard"], { required_error: "Level is required" }),
  status: z.enum(["draft", "published"], { required_error: "Status is required" }),
})

const UpdateCourseForm = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId)
  const [updateCourse] = useUpdateCourseMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: "",
      level: "Easy",
      status: "draft",
    },
  })

  useEffect(() => {
    if (course) {
      reset({
        name: course.name,
        level: course.level,
        status: course.status,
      })
    }
  }, [course, reset])

  if (isLoading) return <p>Loading course...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!course) return <p>No course found</p>

  const onSubmit = async (data) => {
    try {
      await updateCourse({ id: courseId, ...data }).unwrap()
      toast.success(`Course "${data.name}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })

      setTimeout(() => {
        navigate("/user/admin/data/courses")
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
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <NavigateButton buttonText={'🔙'} navigation={'/user/admin/data/courses'}/>
      <h2>
        <strong>Update course:</strong> {course.name}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 15 }}
      >
        {/* Name */}
        <label style={{ fontWeight: "bold" }}>Course Name</label>
        <input
          type="text"
          {...register("name")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        {/* Level */}
        <label style={{ fontWeight: "bold" }}>Level</label>
        <select
          {...register("level")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        {errors.level && <p style={{ color: "red" }}>{errors.level.message}</p>}

        {/* Status */}
        <label style={{ fontWeight: "bold" }}>Status</label>
        <select
          {...register("status")}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {errors.status && <p style={{ color: "red" }}>{errors.status.message}</p>}

        {/* Categories as links */}
        <label style={{ fontWeight: "bold" }}>Categories</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(course.categories || []).map((category) => {
            const catId = typeof category === "string" ? category : category._id
            const catName = typeof category === "string" ? category : category.name
            return (
              <Link
                key={catId}
                to={`/user/admin/data/courses/${course._id}/category/${catId}/update`}
                state={{ from: location.pathname }}
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  marginBottom: 4,
                }}
              >
                {catName}
              </Link>
            )
          })}
        </div>

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

export default UpdateCourseForm