import { useParams } from "react-router-dom"
import { useGetChallengeResultsQuery } from "../../../challenge/challengeApi"
import QuestionPrompt from "./questionPrompt"
import OptionsReview from "./optionsReview"
import { Box, Typography, Paper } from "@mui/material"
import CustomLink from "../../../../components/customLink"
import LoadingSpinner from "../../../../components/loadingSpinner"
import ErrorMessage from "../../../../components/errorMessage"

const ChallengeResults = () => {
  const { challengeId, courseId } = useParams()
  const { data, isLoading, error } = useGetChallengeResultsQuery(challengeId)

  if (isLoading) return <LoadingSpinner text="טוען אתגר"/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

  const questions = data?.questions || []
  const totalScore = data?.totalScore || 0

  return (
    <Box className="p-6 max-md:p-4 flex flex-col items-center gap-6 max-md:gap-4">
      <Typography variant="h4" className="text-pink-600 font-extrabold text-center mb-4 max-md:text-2xl">
        🌟 Challenge Results 🌟
      </Typography>

      {questions.map((question, i) => (
        <Paper
          key={question?._id || i}
          className="
            w-full max-w-3xl max-md:w-lg  p-6 max-md:p-4 
            rounded-3xl 
            bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 
            shadow-2xl 
            transform hover:scale-105 
            transition-all
          "
        >
          <div className="flex justify-between  max-md:items-center items-center mb-4 max-md:gap-2">
            <Typography variant="h6" className="font-bold text-indigo-700 max-md:text-base">
              שאלה {i + 1}
            </Typography>
            <Typography variant="h6" className="font-bold text-green-600 max-md:text-base">
              ציון: {question?.userAnswer?.grade ?? 0}
            </Typography>
          </div>

          <QuestionPrompt question={question} status={question?.status ?? 0} />
          <OptionsReview question={question} isKidFriendly={true} />

          <div className="flex gap-4 max-md:gap-2 mt-4 text-sm max-md:text-xs font-bold text-gray-700 justify-center">
            <span className="flex items-center gap-1">
              <span className="inline-block w-5 h-5 rounded-full bg-green-500 max-md:w-4 max-md:h-4"></span> Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-5 h-5 rounded-full bg-red-500 max-md:w-4 max-md:h-4"></span> Wrong
            </span>
          </div>
        </Paper>
      ))}

      <Paper
        className="
          w-full max-w-3xl p-6 max-md:p-4 
          flex justify-between items-center 
          rounded-3xl 
          bg-gradient-to-r from-green-200 to-emerald-300 
          shadow-xl 
          text-purple-800 font-extrabold text-xl max-md:text-lg
        "
      >
        <span>ציון סופי 🎉</span>
        <span>{totalScore}</span>
      </Paper>

      <CustomLink to={`/user/course/${courseId}/category`} children={'חזרה לקורס'}/>
    </Box>
  )
}

export default ChallengeResults