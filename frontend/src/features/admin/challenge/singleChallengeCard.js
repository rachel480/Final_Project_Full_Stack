import { NavLink, useParams ,useNavigate} from "react-router-dom"
import NavigateButton from "../../../components/navigateButton"
import { useGetFullChallengeByIdQuery } from "../../challenge/challengeApi"
import { use } from "react"

const SingleChallengeCard = () => {
  const navigate = useNavigate()
  const { challengeId, courseId, categoryId } = useParams()
  const { data: challenge, isLoading, error } = useGetFullChallengeByIdQuery(challengeId)

  if (isLoading) return <p>Loading challenge...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!challenge) return <p>Challenge not found</p>

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
          navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`}
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
        Challenge
      </h2>

      <div>
        <strong>Questions:</strong>
        {/* Add question button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginTop: "12px",
              border: "1px dashed #aaa",
              borderRadius: "6px",
              backgroundColor: "#fafafa",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#555" }}>Add Question</span>
            <button
              style={{
                backgroundColor: "#2196f3",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`question/add`)}
            >
              ➕
            </button>
          </div>
        <div style={{ marginTop: "12px" }}>
          {challenge.questions.map((question) => (
            <div
              key={question._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <NavLink
                to={`question/${question._id}`}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                {question.question.word}?
              </NavLink>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
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
    </div>
  )
}

export default SingleChallengeCard
