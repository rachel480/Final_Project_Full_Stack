import bufferToBase64 from "../../../../utils/imageUtils";
import OptionList from "./optionList";
import QuestionMenu from "./questionMenu";
import { Typography, Paper } from "@mui/material";

const QuestionCard = ({ question, index, handleUsersAnswer, questions, setCurrentIndex }) => {
  let questionImageSrc = ""
  const questionImg = question.question.img
  if (questionImg?.data && questionImg?.contentType) {
    const base64String = bufferToBase64(questionImg.data.data)
    questionImageSrc = `data:image/${questionImg.contentType};base64,${base64String}`
  }

  return (
    <Paper
      elevation={3}
      className="p-6 max-md:p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-center"
    >
      <QuestionMenu questions={questions} setCurrentIndex={setCurrentIndex} />
      <Typography variant="h6" className="font-bold text-indigo-700 mt-2 max-md:text-sm">
        שאלה {index}
      </Typography>
      <div className="my-4 flex justify-center">
        {question.status === 0 ? (
          <Typography className="text-lg font-semibold text-gray-700 max-md:text-sm">
            מה מתאים למילה <span className="text-indigo-600">{question.question.word}</span>?
          </Typography>
        ) : questionImageSrc ? (
          <img
            src={questionImageSrc}
            alt={question.question.word}
            className="w-32 h-32 object-contain rounded-lg shadow-md max-md:w-24 max-md:h-24"
          />
        ) : (
          <Typography color="textSecondary" className="text-xs max-md:text-[10px]">
            לא נמצאה תמונה
          </Typography>
        )}
      </div>

      <OptionList
        options={question.options}
        status={question.status}
        handleUsersAnswer={handleUsersAnswer}
        answer={question.answer}
      />
    </Paper>
  )
}

export default QuestionCard