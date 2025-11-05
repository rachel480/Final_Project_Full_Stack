import { NavLink, useParams, useNavigate } from "react-router-dom"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import NavigateButton from "../../../components/navigateButton"
import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ConfirmDeleteModal from "../../../components/confirmDeleteModal"
import { useDeleteChallengeMutation } from "../../challenge/challengeApi"
import { useDeletewordMutation } from "../../word/wordApi"

const SingleCategoryCard = () => {
  const { categoryId, courseId } = useParams()
  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)
  const navigate = useNavigate()

  const [deleteChallenge] = useDeleteChallengeMutation()
  const [deleteWord] = useDeletewordMutation()

  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [selectedWord, setSelectedWord] = useState(null) 

  const handleDeleteChallenge = async () => {
    if (!selectedChallenge) return
    setShowConfirm(false)

    try {
      await deleteChallenge({ id: selectedChallenge._id }).unwrap()
      toast.success(`Challenge was deleted successfully ✅`, {
        position: "top-right",
        autoClose: 3000,
      })
      navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
    } catch (err) {
      console.error("Delete challenge error:", err)
      const errorMsg = err?.data?.message || "Failed to delete challenge ❌"
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    } finally {
      setSelectedChallenge(null)
    }
  }

  const handleDeleteWord = async () => {
    if (!selectedWord) return
    setShowConfirm(false)

    try {
      await deleteWord({ id: selectedWord._id }).unwrap()
      toast.success(`Word "${selectedWord.word}" was deleted successfully ✅`, {
        position: "top-right",
        autoClose: 3000,
      })
      navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
    } catch (err) {
      console.error("Delete word error:", err)
      const errorMsg = err?.data?.message || "Failed to delete word ❌"
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    } finally {
      setSelectedWord(null)
    }
  }

  if (isLoading) return <p>loading category...</p>
  if (error) return <p>{error?.data?.message || "something went wrong"}</p>
  if (!category) return <p>Category not found</p>

  return (
    <div style={{
      maxWidth: "650px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      <NavigateButton
        navigation={`/user/admin/data/courses/${courseId}`}
        buttonText={'🔙'}
        style={{ marginBottom: "15px" }}
      />

      <h2 style={{ marginBottom: "10px" }}>{category.name}</h2>

      {/* Challenge block */}
      <div style={{ marginTop: "15px" }}>
        <strong>Challenge:</strong>
        <div style={{ marginTop: "5px" }}>
          {category.challenge ? (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              backgroundColor: "#f5f5f5"
            }}>
              <NavLink
                to={`challenge/${category.challenge._id}`}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underLine"
                }}
              >
                Challenge
              </NavLink>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => {
                    setSelectedChallenge(category.challenge)
                    setShowConfirm(true)
                  }}
                  style={{
                    backgroundColor: "#e53935",
                    color: "#fff",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  🗑️
                </button>
                <button
                  style={{
                    backgroundColor: "#fbc02d",
                    color: "#333",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`challenge/${category.challenge._id}/update`)}
                >
                  ✏️
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              border: "1px dashed #aaa",
              borderRadius: "6px",
              backgroundColor: "#fafafa"
            }}>
              <span style={{ fontWeight: "bold", color: "#555" }}>Add Challenge</span>
              <button
                style={{
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => navigate(`challenge/add`)}
              >
                ➕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Words block */}
      <div style={{ marginTop: "20px" }}>
        <strong>Words:</strong>
        <div style={{ marginTop: "5px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            marginBottom: "8px",
            border: "1px dashed #aaa",
            borderRadius: "6px",
            backgroundColor: "#fafafa"
          }}>
            <span style={{ fontWeight: "bold", color: "#555" }}>Add Word</span>
            <button
              style={{
                backgroundColor: "#2196f3",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
              onClick={() => navigate(`words/add`)}
            >
              ➕
            </button>
          </div>

          {category.words.map(word => (
            <div key={word._id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              backgroundColor: "#f5f5f5"
            }}>
              <NavLink
                to={`words/${word._id}`}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underLine"
                }}
              >
                {word.word}
              </NavLink>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => {
                    setSelectedWord(word)
                    setShowConfirm(true)
                  }}
                  style={{
                    backgroundColor: "#e53935",
                    color: "#fff",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  🗑️
                </button>
                <button
                  style={{
                    backgroundColor: "#fbc02d",
                    color: "#333",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`words/${word._id}/update`)}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Confirm modal */}
      {showConfirm && (selectedChallenge || selectedWord) && (
        <ConfirmDeleteModal
          itemName={selectedChallenge ? "Challenge" : selectedWord.word}
          handleDelete={selectedChallenge ? handleDeleteChallenge : handleDeleteWord}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  )
}

export default SingleCategoryCard