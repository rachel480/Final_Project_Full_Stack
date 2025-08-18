import { useParams } from "react-router-dom"
import { useGetCategoryChallengeQuery } from "./categoryApi"

const ChallengeSection = () => {
  const { categoryId } = useParams()
  const { data: challnge, error, isLoading } = useGetCategoryChallengeQuery(categoryId)
  if (isLoading) return <p>loading challenge...</p>
  if (error) return <p>error loading challenge...</p>

  // פונקציה להמרת מערך מספרים למחרוזת base64
  const bufferToBase64 = (buffer) => {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), "")
    return window.btoa(binary)
  }

  return (
    <div>
      <h1>questions</h1>
      <p>בשאלות הבאת תצטרך לבחור בכל פעם תשובה אחת נכונה או מילה שמתאימה לתמונה או תמונה שמתאימה למילה</p>

      {challnge.questions.map((question, qIndex) => {
        const status = Math.floor(Math.random() * 2)
        const questionImg = question.question.img

        let questionImageSrc = ""
        if (questionImg?.data && questionImg?.contentType) {
          const base64String = bufferToBase64(questionImg.data.data)
          questionImageSrc = `data:image/${questionImg.contentType};base64,${base64String}`
        }

        return (
          <div key={qIndex} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              {status === 0 ? (
                <p>{question.question.word} ?</p>
              ) : (
                questionImageSrc ? (
                  <img
                    src={questionImageSrc}
                    alt={question.question.word}
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                  />
                ) : (
                  <p>לא נמצאה תמונה</p>
                )
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              {question.options.map((option, index) => {
                const optionImg = option.img
                let optionImageSrc = ""

                if (optionImg?.data && optionImg?.contentType) {
                  const base64Option = bufferToBase64(optionImg.data.data)
                  optionImageSrc = `data:image/${optionImg.contentType};base64,${base64Option}`
                }

                return (
                  <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>{index + 1}</p>
                    {status === 0 ? (
                      optionImageSrc ? (
                        <img
                          src={optionImageSrc}
                          alt={option.word}
                          style={{ width: "80px", height: "80px", objectFit: "contain" }}
                        />
                      ) : (
                        <p>אין תמונה</p>
                      )
                    ) : (
                      <button>{option.word}</button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChallengeSection
