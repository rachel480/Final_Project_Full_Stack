import MediumQuestionCard from "./mediumQuestionCard"
import MediumEndModal from "./mediumEndModal"
import ChallengeLogicRoot from "../challengeLogicRoot"

const MediumChallenge = ({ challenge }) => {
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

        if (!questions || questions.length === 0) return <div>Loading...</div>

        return (
          <div className="w-full flex justify-center pt-10">
            {currentIndex < questions.length ? (
              <MediumQuestionCard
                question={questions[currentIndex]}
                index={currentIndex}
                handleUsersAnswer={handleUsersAnswer}
                nextQuestion={nextQuestion}
              />
            ) : (
              <MediumEndModal
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

export default MediumChallenge