import CustomLink from "../../../../components/customLink"
import { Box, Paper, Typography } from "@mui/material"

const HardEndModal = ({ score, total, courseId, challengeId }) => {
  return (
    <Box className="fixed inset-0 bg-red-200 bg-opacity-50 flex justify-center items-center p-4">
      <Paper className="p-6 rounded-3xl max-w-sm w-full bg-gradient-to-br from-red-200 via-yellow-100 to-purple-300 shadow-2xl flex flex-col gap-4 items-center animate-fade-in border-4 border-red-400">
        <Typography variant="h4" className="text-purple-700 font-extrabold text-center">
          🎯 סיימת את האתגר הקשה! 🎯
        </Typography>

        <Typography variant="h5" className="text-indigo-700 font-bold">
          הציון שלך: {score} מתוך {total}
        </Typography>

        <CustomLink to={`/user/course/${courseId}/category`} children={"חזרה לקורס"}/>
        <CustomLink to={`${challengeId}/results`} children={"הצגת תוצאות"}/>
      </Paper>
    </Box>
  )
}

export default HardEndModal
