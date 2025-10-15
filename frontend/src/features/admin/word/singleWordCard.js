import { useParams } from "react-router-dom"
import { useGetWordByIdQuery } from "../../word/wordApi"
import NavigateButton from "../../../components/navigateButton"

const SingleWordCard = () => {
  const { wordId, courseId, categoryId } = useParams()
  const { data: word, isLoading, error } = useGetWordByIdQuery(wordId)

  if (isLoading) return <p>Loading word...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!word) return <p>Word not found</p>

  const wordImg = word.img
  let imageSrc = ""
  if (wordImg?.data && wordImg?.contentType) {
    imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "30px auto",
      padding: "25px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    }}>
      <div style={{ marginBottom: "20px" }}>
        <NavigateButton
          navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`}
          buttonText="🔙 Back"
        />
      </div>

      <h2 style={{
        marginBottom: "15px",
        fontSize: "24px",
        color: "#333"
      }}>
        {word.word}
      </h2>

      <p style={{ margin: "6px 0", fontSize: "16px" }}>
        <strong>Translation:</strong> {word.translation}
      </p>

      <p style={{ margin: "6px 0", fontSize: "16px" }}>
        <strong>Category:</strong> {word.categoryName}
      </p>

      {imageSrc ? (
        <img
          src={imageSrc}
          alt={word.word}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            marginTop: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        />
      ) : (
        <p style={{ marginTop: "20px", color: "#999", fontStyle: "italic" }}>
          No image found
        </p>
      )}
    </div>
  )
}

export default SingleWordCard
