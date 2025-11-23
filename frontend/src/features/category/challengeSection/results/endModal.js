import NavigateButton from "../../../../components/navigateButton";
import { Box, Paper, Typography } from "@mui/material";

const EndModal = ({ courseId, challengeId, score, total }) => {
  return (
    <Box className="fixed inset-0 bg-blue-200 bg-opacity-50 flex justify-center items-center p-4 max-md:p-2">
      <Paper
        className="
          p-6 max-md:p-4 
          rounded-3xl max-w-sm w-full 
          bg-gradient-to-br from-pink-200 via-yellow-100 to-purple-200 
          shadow-2xl 
          flex flex-col gap-4 max-md:gap-3 
          items-center 
          animate-fade-in 
          border-4 border-yellow-400
        "
      >
        <Typography variant="h4" className="text-purple-700 font-extrabold text-center max-md:text-2xl">
          🎉 סיימת את המבחן! 🎉
        </Typography>

        <Typography variant="h5" className="text-indigo-700 font-bold max-md:text-lg">
          הציון שלך: {score} מתוך {total}
        </Typography>

        <div className="flex flex-col gap-2 w-full items-center mt-2 max-md:gap-1">
          <NavigateButton navigation={`/user/course/${courseId}/category`} buttonText="Back to Course" />
          <NavigateButton navigation={`${challengeId}/results`} buttonText="Show Results" />
        </div>
      </Paper>
    </Box>
  )
}

export default EndModal