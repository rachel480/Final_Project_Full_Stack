import MediumQuestionCard from "./mediumQuestionCard"
import ChallengeLogicRoot from "../challengeLogicRoot"
import EndModal from "../results/endModal"
import { Box, Button, Typography, Paper } from "@mui/material"
import { useState } from "react"

const MediumChallenge = ({ challenge }) => {
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
            <Box className="flex flex-col items-center p-6">
              <Paper className="p-8 rounded-2xl w-full max-w-3xl">
                <div className="text-center space-y-4">
                  <Typography variant="h6">במבחן הבא תבחר תשובה נכונה אחת</Typography>
                  <Button variant="contained" onClick={() => setCurrentIndex(0)}>
                    התחל מבחן 🚀
                  </Button>
                </div>
              </Paper>
            </Box>
          )
        }

        return (
          <div className="w-full flex flex-col items-center pt-10">

            {currentIndex < questions.length && !showEndButton && (
              <MediumQuestionCard
                question={questions[currentIndex]}
                index={currentIndex}
                nextQuestion={nextQuestion}
                handleUsersAnswer={handleUsersAnswer}
              />
            )}

            {showEndButton && (
              <Button variant="contained" onClick={handleEnd} className="mt-6">
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

export default MediumChallenge