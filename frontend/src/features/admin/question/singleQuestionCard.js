import { useParams } from "react-router-dom"
import NavigateButton from "../../../components/navigateButton"
import { useGetFullQuestionByIdQuery } from "../../question/questionApi"

const SingleQuestionCard = () => {
  const { questionId, challengeId, courseId, categoryId } = useParams()
  const { data: question, isLoading, error } = useGetFullQuestionByIdQuery(questionId)

  if (isLoading) return <p>Loading question...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!question) return <p>Question not found</p>

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "30px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <NavigateButton
          navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`}
          buttonText="🔙 Back"
        />
      </div>

      <h2
        style={{
          marginBottom: "15px",
          fontSize: "24px",
          color: "#333",
        }}
      >
        Question
      </h2>

      {/* Question text */}
      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <strong>Question:</strong> {question.question.word}
      </div>

      {/* Options */}
      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <strong>Options:</strong>
        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
          {question.options.map((opt) => (
            <li key={opt._id}>{opt.word}</li>
          ))}
        </ul>
      </div>

      {/* Correct Answer */}
      <div
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          fontWeight: "bold",
        }}
      >
        ✅ Correct Answer: {question.correctAnswer.word}
      </div>

      {/* Buttons for actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#fbc02d",
            color: "#333",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ✏️ Edit
        </button>

        <button
          style={{
            backgroundColor: "#e53935",
            color: "#fff",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

export default SingleQuestionCard
