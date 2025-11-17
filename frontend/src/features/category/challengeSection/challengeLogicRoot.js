import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  useGetUserProgressByUserQuery,
  useUpdateChallengeResultInUserProgressMutation,
} from "../../userProgress/userProgressApi"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import { toast } from "react-toastify"
import { useGetCourseByIdQuery } from "../../course/courseApi"

const ChallengeLogicRoot = ({
  challenge,
  children,
  externalIndex,
  setExternalIndex,
}) => {
  const { categoryId, courseId } = useParams()
  const [updateChallengeResultInUserProgress] = useUpdateChallengeResultInUserProgressMutation()
  const { data: userProgress, isLoading, error } = useGetUserProgressByUserQuery()
  const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseByIdQuery(courseId)

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [challengeResults, setChallengeResults] = useState(null)
  const [isNewAttempt, setIsNewAttempt] = useState(true)

  // sync external index if provided
  useEffect(() => {
    if (typeof externalIndex === "number") {
      setCurrentIndex(externalIndex)
    }
  }, [externalIndex])

  // expose changing index back to parent
  useEffect(() => {
    if (setExternalIndex) {
      setExternalIndex(currentIndex)
    }
  }, [currentIndex])

  useEffect(() => {
    if (!challenge?.questions || !userProgress) return

    const existingResult = userProgress?.challengeResults?.find(
      (r) => r.challenge._id.toString() === challenge._id.toString()
    )
    if (existingResult && isNewAttempt) {
      return
    }

    const questionsWithAnswers = challenge.questions.map((question) => {
      const status = Math.floor(Math.random() * 2)
      const answer = {
        question: question._id,
        questionStatus: status,
        userAnswer: "",
        isCorrect: false,
        grade: 0,
      }
      return { ...question, status, answer }
    })

    setQuestions(questionsWithAnswers)
  }, [challenge, userProgress, isNewAttempt])

  const handleUsersAnswer = (usersAnswer) => {
    const question = questions[currentIndex]
    const isCorrect = usersAnswer === question.correctAnswer.word
    const answer = {
      question: question.answer.question,
      questionStatus: question.answer.questionStatus,
      userAnswer: usersAnswer,
      isCorrect,
      grade: isCorrect ? 10 : 0,
    }

    setQuestions((prev) =>
      prev.map((q, i) => (i === currentIndex ? { ...q, answer } : q))
    )
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const handleEnd = async () => {
    if (course.level === "Easy") {
      const unAnswered = questions.find((q) => !q.answer.userAnswer)
      if (unAnswered) {
        toast.error("יש שאלות שלא נענו", { autoClose: 3000 })
        return
      }
    }
    const answers = questions.map((q) => q.answer)
    const totalScore = answers.reduce((a, b) => a + b.grade, 0)

    const results = {
      challenge: challenge._id,
      answers,
      totalScore,
    }

    setChallengeResults(results)

    try {
      await updateChallengeResultInUserProgress({
        challengeResults: results,
        categoryId,
      }).unwrap()

      setCurrentIndex(questions.length)
      setIsNewAttempt(false)
    } catch (err) {
      toast.error(err?.data?.message || "שגיאה לא צפויה")
    }
  }

  if (isLoading || courseLoading) return <LoadingSpinner />
  if (error || courseError) return <ErrorMessage message={error?.data?.message || "שגיאה בטעינת נתוני המשתמש"}/>


  return children({
    questions,
    currentIndex,
    setCurrentIndex,
    handleUsersAnswer,
    handleNext,
    handleEnd,
    challengeResults,
    courseId,
  })
}

export default ChallengeLogicRoot