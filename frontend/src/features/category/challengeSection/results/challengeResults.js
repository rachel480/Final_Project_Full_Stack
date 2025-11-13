import { useParams } from "react-router-dom"
import { useGetChallengeResultsQuery } from "../../../challenge/challengeApi"
import QuestionPrompt from "./questionPrompt"
import OptionsReview from "./optionsReview"
import NavigateButton from "../../../../components/navigateButton"
import { Box, Typography, Paper } from "@mui/material"

const ChallengeResults = () => {
  const { challengeId, courseId } = useParams()
  const { data, isLoading, error } = useGetChallengeResultsQuery(challengeId)

  if (isLoading) return <Typography>Loading challenge...</Typography>
  if (error) return <Typography color="error">Error loading challenge...</Typography>

  const questions = data?.questions || []
  const totalScore = data?.totalScore || 0

  return (
    <Box className="p-6 flex flex-col items-center gap-6">
      <Typography variant="h4" className="text-pink-600 font-extrabold text-center mb-4">
        🌟 Challenge Results 🌟
      </Typography>

      {questions.map((question, i) => (
        <Paper key={question?._id || i} className="w-full max-w-3xl p-6 rounded-3xl bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 shadow-2xl transform hover:scale-105 transition-all">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-bold text-indigo-700">שאלה {i + 1}</Typography>
            <Typography variant="h6" className="font-bold text-green-600">Grade: {question?.userAnswer?.grade ?? 0}</Typography>
          </div>

          <QuestionPrompt question={question} status={question?.status ?? 0} />
          <OptionsReview question={question} isKidFriendly={true} />

          <div className="flex gap-4 mt-4 text-sm font-bold text-gray-700">
            <span className="flex items-center gap-1">
              <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span> Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-5 h-5 rounded-full bg-red-500"></span> Wrong
            </span>
          </div>
        </Paper>
      ))}

      <Paper className="w-full max-w-3xl p-6 flex justify-between items-center rounded-3xl bg-gradient-to-r from-green-200 to-emerald-300 shadow-xl text-purple-800 font-extrabold text-xl">
        <span>Final Score 🎉</span>
        <span>{totalScore}</span>
      </Paper>

      <NavigateButton navigation={`/user/course/${courseId}/category`} buttonText="Back to Course" />
    </Box>
  )
}

export default ChallengeResults
