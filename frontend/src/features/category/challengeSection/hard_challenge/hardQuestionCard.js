import { useEffect, useState, useRef } from "react"
import { Typography } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import HardOptionList from "./hardOptionList"
import LoadingSpinner from "../../../../components/loadingSpinner"
import bufferToBase64 from "../../../../utils/imageUtils"

const HardQuestionCard = ({ question, index, nextQuestion, handleUsersAnswer }) => {
  const [timer, setTimer] = useState(7)
  const [answered, setAnswered] = useState(false)
  const answeredRef = useRef(answered)

  useEffect(() => { answeredRef.current = answered }, [answered])

  useEffect(() => {
    setTimer(7)
    setAnswered(false)

    const interval = setInterval(() => setTimer(t => t - 1), 1000)
    const timeout = setTimeout(() => {
      if (!answeredRef.current) nextQuestion()
    }, 7000)

    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [index, nextQuestion])

  if (!question) return <LoadingSpinner/>

  const chooseAnswer = (word) => {
    if (answered) return
    setAnswered(true)
    handleUsersAnswer(word)
    setTimeout(() => nextQuestion(), 300)
  }

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center">
      <div className="absolute top-4 flex items-center gap-2 text-red-600 text-3xl font-bold">
        <AccessTimeIcon fontSize="large" />
        {timer}
      </div>

      {question.status === 0 ? (
        <Typography className="text-4xl font-bold text-indigo-700 mb-8 text-center">
          {question.question.word}
        </Typography>
      ) : question.question.img?.data ? (
        <img
          src={`data:image/${question.question.img.contentType};base64,${bufferToBase64(question.question.img.data.data)}`}
          alt={question.question.word}
          className="w-32 h-32 object-contain rounded-lg shadow-md mb-8"
        />
      ) : (
        <Typography className="text-gray-400 mb-8">לא נמצאה תמונה</Typography>
      )}

      <HardOptionList
        options={question.options}
        status={question.status}
        answer={question.answer}
        chooseAnswer={chooseAnswer}
      />
    </div>
  )
}

export default HardQuestionCard