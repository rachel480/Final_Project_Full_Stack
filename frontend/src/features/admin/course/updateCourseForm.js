import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useUpdateCourseMutation } from "../../course/courseApi"

const updateCourseSchema = z.object({
  level: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Level is required",
  }),
  categories: z
    .array(z.string().nonempty("Category ID is required"))
    .nonempty("At least one category is required"),
})

const UpdateCourseForm = ({ setShowUpdateForm, course }) => {
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      level: course?.level || "Easy",
      categories: course?.categories?.map((category) => category._id || category) || [],
    },
  })

  const [updateCourse, { isLoading }] = useUpdateCourseMutation()

  const onSubmit = async (data) => {
    try {
      setErrorMsg("")
      const res = await updateCourse({
        id: course._id,
        level: data.level,
        categories: data.categories,
      }).unwrap()

      setMessage(res.message)
      setTimeout(() => {
        setMessage("")
        setShowUpdateForm(false)
      }, 2000)
    } catch (err) {
      setErrorMsg(err?.data?.message || "Something went wrong. Please try again!!")
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          padding: 14,
          border: "1px solid #eee",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        }}
      >
        <h1>Update Course</h1>

        {/* Level */}
        <label htmlFor="level">Level</label>
        <select id="level" {...register("level")}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        {errors.level && <p style={{ color: "red" }}>{errors.level.message}</p>}

        <button type="submit" disabled={isLoading}>
          Update
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => setShowUpdateForm(false)}
        >
          Cancel
        </button>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {message && <p style={{ color: "rgb(64, 255, 102)" }}>{message}</p>}
      </form>
    </div>
  )
}

export default UpdateCourseForm