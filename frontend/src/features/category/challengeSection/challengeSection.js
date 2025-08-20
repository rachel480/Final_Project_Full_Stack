import { useParams } from "react-router-dom"
import { useGetCategoryChallengeQuery } from "../categoryApi"
import QuestionCard from "./questionCard"
import { useEffect, useState } from "react"
import { useUpdateChallengeResultInUserProgressMutation } from "../../userProgress/userProgressApi"

const ChallengeSection = () => {
  const { categoryId } = useParams()
  const { data: challnge, error, isLoading } = useGetCategoryChallengeQuery(categoryId)
  const [updateChallengeResultInUserProgress, { isLoading: isLoadingUpdate }] = useUpdateChallengeResultInUserProgressMutation()

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!challnge?.questions) return
    const questions = challnge.questions
    //map that adds for each question his status

    const questionsWithStatus = questions.map((question) => {
      const status = Math.floor(Math.random() * 2)
      return { ...question, status }
    })

    //map the adds for each question his answer
    const questionsWithAnswers = questionsWithStatus.map((question) => {
      const answer = {
        question: question._id,
        userAnswer: "",
        isCorrect: false,
        grade: 0
      }
      return { ...question, answer }
    })
    //update the question
    setQuestions(questionsWithAnswers)
  }, [challnge])

  const handleNext = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex(currentIndex + 1)

  }
  const handlePrev = () => {
    if (currentIndex > 0)
      setCurrentIndex(currentIndex - 1)
  }
  const handleEnd = async () => {
    let totalScore=0
    
    const answers=questions.map((question)=>{
      totalScore+=question.answer.grade
      return question.answer
    })
    
    const challengeResults = {
      challenge: challnge._id,
      answers,
      totalScore,
      completedAt: null
    }
    setMessage(null)
    try {
      await updateChallengeResultInUserProgress({ challengeResults, categoryId }).unwrap()
      setMessage({ type: 'success', text: 'update successfully' })
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        'unknown error'
      setMessage({ type: 'error', text: errorMsg })
    }
  }
  const handleUserAnswer = (userAnswer) => {
    const question = questions[currentIndex]
    const isCorrect = userAnswer === question.correctAnswer.word
    const answer = {
      question: question.answer.question,
      userAnswer: userAnswer,
      isCorrect,
      grade: isCorrect ? 10 : 0
    }
    const questionsWithUsersAnswer = questions.map((question, index) => {
      if (index === currentIndex)
        return { ...question, answer }
      return question
    })
    setQuestions(questionsWithUsersAnswer)
  }

  if (isLoading)
    return <p>loading challenge...</p>

  if (error)
    return <p>error loading challenge...</p>

  if (!questions)
    return <p>loading questions.....</p>

  if (isLoadingUpdate)
    return <p>update...</p>

  return (
    <div>
      <h1>questions</h1>
      <p>בשאלות הבאת תצטרך לבחור בכל פעם תשובה אחת נכונה או מילה שמתאימה לתמונה או תמונה שמתאימה למילה</p>

      {questions[currentIndex] && (
        <QuestionCard
          key={currentIndex}
          question={questions[currentIndex]}
          index={currentIndex + 1}
          handleUserAnswer={handleUserAnswer}
          questions={questions}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      {currentIndex !== 0 && currentIndex !== -1 && <button onClick={() => { handlePrev() }}>⬅️קודם</button>}
      {currentIndex !== questions?.length - 1 && currentIndex !== -1 && <button onClick={() => { handleNext() }}>➡️הבא</button>}
      {currentIndex === questions?.length - 1 && currentIndex !== -1 && <button onClick={() => { handleEnd() }}>סיום הבוחן</button>}
      {currentIndex === -1 && <button onClick={() => setCurrentIndex(0)}>התחלת המשחק</button>}

      {message && (
        <div
          style={{
            color: message.type === 'error' ? 'red' : 'green',
            marginBottom: '1rem',
          }}
        >
          {message.text}
        </div>
      )}
    </div>

  )
}

export default ChallengeSection