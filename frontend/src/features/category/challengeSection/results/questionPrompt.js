import { Typography, Box } from "@mui/material"

const QuestionPrompt = ({ question, status }) => {
  const questionImg = question?.question?.img
  const hasImg = questionImg?.data && questionImg?.contentType
  const src = hasImg ? `data:image/${questionImg.contentType};base64,${questionImg.data}` : ""

  if (status === 0)
    return (
      <Typography variant="h6" className="text-indigo-700 my-2">{question?.question?.word}?</Typography>
    )

  return (
    <Box className="my-4 flex justify-center">
      {src ? (
        <img src={src} alt={question?.question?.word} className="w-32 h-32 object-contain rounded-lg shadow-md" />
      ) : (
        <Typography color="textSecondary">לא נמצאה תמונה</Typography>
      )}
    </Box>
  )
}

export default QuestionPrompt
