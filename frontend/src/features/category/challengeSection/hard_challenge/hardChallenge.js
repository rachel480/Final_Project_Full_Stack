import HardQuestionCard from "./hardQuestionCard"
import ChallengeLogicRoot from "../challengeLogicRoot"
import EndModal from "../results/endModal"
import LoadingSpinner from "../../../../components/loadingSpinner"

const HardChallenge = ({ challenge }) => {
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
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1)
          } else {
            handleEnd()
          }
        }

        if (!questions || questions.length === 0) return <LoadingSpinner/>

        return (
          <div className="w-full flex justify-center pt-10 max-md:pt-6">
            {currentIndex < questions.length ? (
              <HardQuestionCard
                question={questions[currentIndex]}
                index={currentIndex}
                handleUsersAnswer={handleUsersAnswer}
                nextQuestion={nextQuestion}
              />
            ) : (
              <EndModal
                score={challengeResults?.totalScore || 0}
                total={questions.length * 10}
                courseId={courseId}
                challengeId={challenge._id}
              />
            )}
          </div>
        )
      }}
    </ChallengeLogicRoot>
  )
}

export default HardChallenge