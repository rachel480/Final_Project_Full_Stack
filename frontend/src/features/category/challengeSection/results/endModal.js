
import NavigateButton from "../../../../components/navigateButton"
import { Box, Paper, Typography } from "@mui/material"

const EndModal = ({ challengeResults, courseId }) => {
  const challengeId = challengeResults.challenge._id || challengeResults.challenge

  return (
    <Box className="fixed inset-0 bg-blue-200 bg-opacity-50 flex justify-center items-center p-4">
      <Paper className="p-6 rounded-3xl max-w-sm w-full bg-gradient-to-br from-pink-200 via-yellow-100 to-purple-200 shadow-2xl flex flex-col gap-4 items-center animate-fade-in border-4 border-yellow-400">
        <Typography variant="h4" className="text-purple-700 font-extrabold text-center">🎉 כל השאלות נענו! 🎉</Typography>
        <Typography variant="h5" className="text-indigo-700 font-bold">Your grade: {challengeResults.totalScore}</Typography>
        <div className="flex gap-4 mt-4 w-full justify-center">
          <NavigateButton navigation={`/user/course/${courseId}/category`} buttonText="Back to Course" />
          <NavigateButton navigation={`${challengeId}/results`} buttonText="Show Results" />
        </div>
      </Paper>
    </Box>
  )
}

export default EndModal
