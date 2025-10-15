import { useState } from "react"
import UpdateCourseForm from "./updateCourseForm"
import { useDeleteCourseMutation } from "../../course/courseApi"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ course }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const [deleteCourse, { isLoading: deleting }] = useDeleteCourseMutation()

  const handleDelete = async () => {
    setMessage(null)
    try {
      const res = await deleteCourse({ id: course._id }).unwrap()
      setMessage({ type: "success", text: res?.message || "Deleted successfully" })
    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || "Unknown error"
      setMessage({ type: "error", text: errorMsg })
    } finally {
      setTimeout(() => setMessage(null), 2000)
    }
  }

  return (
    <div
      style={{
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={() => navigate(`${course._id}`)}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {course.name}
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {deleting ? "Deleting..." : "🗑️"}
          </button>

          <button
            onClick={() => setShowUpdateForm(true)}
            style={{
              backgroundColor: "#fbc02d",
              color: "#333",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>
        </div>
      </div>

      {showUpdateForm && (
        <UpdateCourseForm setShowUpdateForm={setShowUpdateForm} course={course} />
      )}

      {message && (
        <div
          style={{
            color: message.type === "error" ? "red" : "green",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}

export default CourseCard
