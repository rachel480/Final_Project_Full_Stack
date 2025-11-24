import HardQuestionCard from "./hardQuestionCard"
import ChallengeLogicRoot from "../challengeLogicRoot"
import EndModal from "../results/endModal"
import { Box, Button, Typography, Paper } from "@mui/material"
import { useState } from "react"

const HardChallenge = ({ challenge }) => {
  const [showEndButton, setShowEndButton] = useState(false)

  return (
    <ChallengeLogicRoot challenge={challenge}>
      {({
        questions,
        currentIndex,
        setCurrentIndex,
        handleUsersAnswer,
        handleEnd,
        challengeResults,
        courseId
      }) => {

        const nextQuestion = () => {
          if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1)
          } else {
            setShowEndButton(true)
          }
        }

        if (currentIndex === -1) {
          return (
            <Box className="flex flex-col items-center p-6 max-md:p-4">
              <Paper className="p-8 max-md:p-6 rounded-2xl w-full max-w-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" elevation={4}>
                <div className="text-center space-y-4">
                  <Typography variant="h6" className="max-md:text-sm">
                    במבחן הבא תצטרך לבחור תשובה נכונה אחת בכל שאלה 🎯
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setCurrentIndex(0)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-6 py-3 max-md:px-4 max-md:py-2 text-sm"
                  >
                    התחל מבחן 🚀
                  </Button>
                </div>
              </Paper>
            </Box>
          )
        }

        return (
          <div className="w-full flex flex-col items-center pt-10 max-md:pt-6">
            {currentIndex < questions.length && !showEndButton && (
              <HardQuestionCard
                question={questions[currentIndex]}
                index={currentIndex}
                handleUsersAnswer={handleUsersAnswer}
                nextQuestion={nextQuestion}
              />
            )}

            {showEndButton && (
              <Button
                variant="contained"
                onClick={handleEnd}
                className="mt-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl max-md:w-full"
              >
                סיום מבחן 🏁
              </Button>
            )}

            {currentIndex === questions.length && challengeResults && (
              <EndModal
                challengeId={challenge._id}
                courseId={courseId}
                score={challengeResults?.totalScore || 0}
                total={questions.length * 10}
              />
            )}
          </div>
        )
      }}
    </ChallengeLogicRoot>
  )
}

export default HardChallenge
