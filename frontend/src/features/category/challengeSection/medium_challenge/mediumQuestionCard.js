import { useEffect, useState, useRef } from "react"
import { Typography } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import MediumOptionList from "./mediumOptionList"
import LoadingSpinner from "../../../../components/loadingSpinner"
import bufferToBase64 from "../../../../utils/imageUtils"

const MediumQuestionCard = ({ question, index, nextQuestion, handleUsersAnswer }) => {
  const [timer, setTimer] = useState(10)
  const [answered, setAnswered] = useState(false)
  const answeredRef = useRef(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => { answeredRef.current = answered }, [answered])

  useEffect(() => {
    setTimer(10)
    setAnswered(false)
    setSelectedAnswer(null)

    const interval = setInterval(() => setTimer(t => t - 1), 1000)
    const timeout = setTimeout(() => {
      if (!answeredRef.current) {
        handleUsersAnswer(null)
        nextQuestion()
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [index])

  if (!question) return <LoadingSpinner />

  const chooseAnswer = (word) => {
    if (answered) return
    setAnswered(true)
    setSelectedAnswer(word)
    handleUsersAnswer(word)

    setTimeout(() => nextQuestion(), 400)
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

      <MediumOptionList
        options={question.options}
        status={question.status}
        answer={{ userAnswer: selectedAnswer }}
        chooseAnswer={chooseAnswer}
        disabled={answered}
      />

    </div>
  )
}

export default MediumQuestionCard