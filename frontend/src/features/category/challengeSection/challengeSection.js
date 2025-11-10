import { useNavigate, useParams } from "react-router-dom"
import { useGetCategoryChallengeQuery } from "../categoryApi"
import QuestionCard from "./questionCard"
import { useEffect, useState } from "react"
import { useGetUserProgressByUserQuery, useUpdateChallengeResultInUserProgressMutation } from "../../userProgress/userProgressApi"
import EndModal from "./results/endModal"

const ChallengeSection = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { courseId } = useParams()
  const { data: challnge, isLoading , error} = useGetCategoryChallengeQuery(categoryId)
  const [updateChallengeResultInUserProgress, { isLoading: isLoadingUpdate }] = useUpdateChallengeResultInUserProgressMutation()
  const { data: userProgress, isLoading: isUserProgressLoading ,errorUserProgress} = useGetUserProgressByUserQuery()

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [message, setMessage] = useState(null)
  const [challengeResults, setChallengeResults] = useState(null)
  const [isNewAttempt, setIsNewAttempt] = useState(true)//

  useEffect(() => {
    if (!challnge?.questions || !userProgress)
      return

    const existingResult = userProgress?.challengeResults?.find(
      (result) => result.challenge._id.toString() === challnge._id.toString()
    )

    if (existingResult&& isNewAttempt) {
      navigate(`${existingResult.challenge._id}/results`)
      return
    }
    if (!existingResult) {
    const questions = challnge.questions.map((question) => {
      const status = Math.floor(Math.random() * 2)
      const answer = {
        question: question._id,
        questionStatus: status,
        userAnswer: "",
        isCorrect: false,
        grade: 0
      }
      return { ...question, status, answer }
    })
    setQuestions(questions)
  }

    const questions = challnge.questions

    //map that adds for each question his status 
    const questionsWithStatus = questions.map((question) => {
      const status = Math.floor(Math.random() * 2)
      return { ...question, status }
    })

    //map that adds for each question his answer
    const questionsWithAnswers = questionsWithStatus.map((question) => {
      const answer = {
        question: question._id,
        questionStatus:question.status,
        userAnswer: "",
        isCorrect: false,
        grade: 0
      }
      return { ...question, answer }
    })

    //updates the questions
    setQuestions(questionsWithAnswers)

  }, [challnge,userProgress,isNewAttempt,navigate])

  const handleNext = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex(currentIndex + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0)
      setCurrentIndex(currentIndex - 1)
  }

  const handleEnd = async () => {
    let totalScore = 0

    //check if all questions were answered
    const foundNoAnsweredQuestion = questions.find(question => question.answer.userAnswer.length === 0)

    if (foundNoAnsweredQuestion) {
      alert('Not all the question were answered')
      return
    }

    const answers = questions.map((question) => {
      totalScore += question.answer.grade
      return question.answer
    })

    const results = {
      challenge: challnge._id,
      answers,
      totalScore,
      completedAt: null
    }
    setChallengeResults({ ...results })

    setMessage(null)
    try {
      await updateChallengeResultInUserProgress({ challengeResults: results, categoryId }).unwrap()
      setCurrentIndex(questions.length)
      setIsNewAttempt(false)
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        'unknown error'
      setMessage({ type: 'error', text: errorMsg })
      setTimeout(() => { setMessage(null) }, 2000)
    }
  }

  const handleUsersAnswer = (usersAnswer) => {
    const question = questions[currentIndex]
    const isCorrect = usersAnswer === question.correctAnswer.word

    const answer = {
      question: question.answer.question,
      questionStatus:question.answer.questionStatus,
      userAnswer: usersAnswer,
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

  if (isLoading || isUserProgressLoading)
    return <p>loading ...</p>

  if (error || errorUserProgress)
    return <p>error loading...</p>

  if (!questions)
    return <p>loading questions...</p>

  if (isLoadingUpdate)
    return <p>updating ...</p>

  return (
    <div>
      {questions[currentIndex] &&
        <QuestionCard
          key={currentIndex}
          question={questions[currentIndex]}
          index={currentIndex + 1}
          questions={questions}
          handleUsersAnswer={handleUsersAnswer}
          setCurrentIndex={setCurrentIndex}
        />
      }

      {
        currentIndex !== -1 && currentIndex !== questions.length && <div>
          <button onClick={() => handlePrev()} disabled={currentIndex === 0}>שאלה קודמת</button>
          {currentIndex !== questions.length - 1 && <button onClick={() => handleNext()}>שאלה הבאה</button>}
          {currentIndex === questions.length - 1 && <button onClick={() => handleEnd()}>סיום הבוחן</button>}
        </div>
      }

      {currentIndex === -1 &&
        <div>
          <p>בשאלות הבאות תצטרך לבחור בכל פעם תשובה אחת נכונה או מילה שמתאימה לתמונה או תמונה שמתאימה למילה</p>
          <button onClick={() => setCurrentIndex(0)}>התחלת המבחן</button>
        </div>
      }

      {message && (<div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '1rem', }}>{message.text}</div>)}
      {currentIndex === challnge.questions.length && challengeResults && <EndModal challengeResults={challengeResults} courseId={courseId}/>}
    </div>
  )
}

export default ChallengeSection