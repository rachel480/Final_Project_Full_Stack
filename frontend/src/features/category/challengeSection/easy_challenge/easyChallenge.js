import { Button, Typography, Paper, Box } from "@mui/material"
import QuestionCard from "./questionCard"
import EndModal from "../results/endModal"
import ChallengeLogicRoot from "../challengeLogicRoot"

const EasyChallenge = ({ challenge }) => {
  return (
    <ChallengeLogicRoot challenge={challenge}>
      {({
        questions,
        currentIndex,
        setCurrentIndex,
        handleUsersAnswer,
        handlePrev,
        handleNext,
        handleEnd,
        challengeResults,
        courseId,
      }) => (
        <Box className="flex flex-col items-center p-6">
          <Paper elevation={4} className="p-8 rounded-2xl w-full max-w-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

            {questions[currentIndex] ? (
              <QuestionCard
                key={currentIndex}
                question={questions[currentIndex]}
                index={currentIndex + 1}
                questions={questions}
                handleUsersAnswer={handleUsersAnswer}
                setCurrentIndex={setCurrentIndex}
              />
            ) : (
              <div className="text-center space-y-4">
                <Typography variant="h6">
                  במבחן הבא תצטרך להתאים בין מילים לתמונות או לבחור תשובה נכונה אחת בכל שאלה 🎯
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setCurrentIndex(0)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-6 py-3"
                >
                  התחל מבחן 🚀
                </Button>
              </div>
            )}

            {currentIndex !== -1 && currentIndex < questions.length && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outlined"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="rounded-xl border-purple-400 text-purple-600 hover:bg-purple-100"
                >
                  שאלה קודמת
                </Button>

                {currentIndex === questions.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleEnd}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl"
                  >
                    סיום המבחן 🏁
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl"
                  >
                    שאלה הבאה ➡️
                  </Button>
                )}
              </div>
            )}

            {currentIndex === challenge?.questions?.length && challengeResults && (
              <EndModal challengeResults={challengeResults} courseId={courseId} />
            )}
          </Paper>
        </Box>
      )}
    </ChallengeLogicRoot>
  )
}

export default EasyChallenge