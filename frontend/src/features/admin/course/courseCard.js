import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteCourseMutation } from "../../course/courseApi"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ConfirmDeleteModal from "../../../components/confirmDeleteModal"

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  const [deleteCourse] = useDeleteCourseMutation()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setShowConfirm(false)
    try {
      await deleteCourse({ id: course._id }).unwrap()
      toast.success(`Course "${course.name}" was deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      console.error("Delete error:", err)
      const errorMsg = err?.data?.message || "Server error occurred while deleting the course."
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      })
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
        position: "relative",
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
            onClick={() => setShowConfirm(true)}
            style={{
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🗑️
          </button>

          <button
            onClick={() => navigate(`${course._id}/update`)}
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

      {/* ✅ Confirmation modal */}
      {showConfirm && (
        <ConfirmDeleteModal
          itemName={course.name}
          handleDelete={handleDelete}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  )
}

export default CourseCard