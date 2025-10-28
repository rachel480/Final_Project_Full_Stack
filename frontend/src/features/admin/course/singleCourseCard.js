import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetFullCourseByIdQuery } from "../../course/courseApi"
import { useDeleteCategoryMutation } from "../../category/categoryApi"
import NavigateButton from "../../../components/navigateButton"
import ConfirmDeleteModal from "../../../components/confirmDeleteModal"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SingleCourseCard = () => {
  const { courseId } = useParams()
  const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId)
  const navigate = useNavigate()

  const [deleteCategory] = useDeleteCategoryMutation()
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return
    setShowConfirm(false)

    try {
      await deleteCategory({ id: selectedCategory._id }).unwrap()
      toast.success(`Category "${selectedCategory.name}"was deleted successfully ✅`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      console.error("Delete category error:", err)
      const errorMsg = err?.data?.message || "Failed to delete category ❌"
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      })
    } finally {
      setSelectedCategory(null)
    }
  }

  if (isLoading) return <p>Loading course...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <NavigateButton
        navigation={"/user/admin/data/courses"}
        buttonText={"🔙"}
        style={{ marginBottom: "15px" }}
      />

      <h2 style={{ marginBottom: "10px" }}>{course.name}</h2>
      <p style={{ margin: "4px 0" }}>
        <strong>Level:</strong> {course.level}
      </p>
      <p style={{ margin: "4px 0" }}>
        <strong>Status:</strong> {course.status}
      </p>

      <div style={{ marginTop: "15px" }}>
        <strong>Categories:</strong>
        <div style={{ marginTop: "5px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              border: "1px dashed #aaa",
              borderRadius: "6px",
              backgroundColor: "#fafafa",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#555" }}>
              Add Category
            </span>
            <button
              style={{
                backgroundColor: "#2196f3",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => navigate("category/add")}
            >
              ➕
            </button>
          </div>

          {course.categories.map((category) => (
            <div
              key={category._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <button
                onClick={() => navigate(`category/${category._id}`)}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                {category.name}
              </button>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => {
                    setSelectedCategory(category)
                    setShowConfirm(true)
                  }}
                  style={{
                    backgroundColor: "#e53935",
                    color: "#fff",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>

                <button
                  onClick={() => navigate(`category/${category._id}/update`)}
                  style={{
                    backgroundColor: "#fbc02d",
                    color: "#333",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Confirm modal for delete */}
      {showConfirm && selectedCategory && (
        <ConfirmDeleteModal
          itemName={selectedCategory.name}
          handleDelete={handleDeleteCategory}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  )
}

export default SingleCourseCard