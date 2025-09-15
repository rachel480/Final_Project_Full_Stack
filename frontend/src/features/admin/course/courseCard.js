import { useState } from "react"
import UpdateCourseForm from "./updateCourseForm"
import { useDeleteCourseMutation } from "../../course/courseApi"

const CourseCard = ({ course }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [message, setMessage] = useState(null)

  const [deleteCourse, { isLoading: deleting }] = useDeleteCourseMutation()

  const handleDelete = async () => {
    setMessage(null)
    try {
      const res = await deleteCourse({ id: course._id }).unwrap()
      setMessage({ type: "success", text: res?.message || "deleted successfully" })
      setTimeout(() => setMessage(null), 2000)
    } catch (err) {
      const errorMsg =
        err?.data?.message || err?.error || "unknown error"
      setMessage({ type: "error", text: errorMsg })
      setTimeout(() => setMessage(null), 2000)
    }
  }

  return (
    <div>
      <div
        key={course._id}
        style={{
          backgroundColor: "green",
          height: "10vh",
          width: "60vw",
          marginBottom: "1vh",
          marginLeft: "20vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem"
        }}
      >
        <button style={{ backgroundColor: "gray", textDecoration: "underline" }}>
          {course.level}
        </button>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{ backgroundColor: "red" }}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "deleting..." : "🗑️"}
          </button>

          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => setShowUpdateForm(true)}
          >
            ✏️
          </button>
        </div>
      </div>

      {showUpdateForm && (
        <UpdateCourseForm
          setShowUpdateForm={setShowUpdateForm}
          course={course}
        />
      )}

      {message && (
        <div style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </div>
      )}
    </div>
  )
}

export default CourseCard