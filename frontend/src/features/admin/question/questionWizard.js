import { useSelector, useDispatch } from "react-redux"
import { goToStep, selectWizardStep, selectWizardData, setQuestionInfo, resetWizard } from "./questionWizardSlice"
import NavigateButton from "../../../components/navigateButton"
import FinalSaveButton from "../common/finalSaveButton"
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCreateQuestionMutation } from "../../question/questionApi"
import AddQuestionInfo from "./addQuestionInfo"

const QuestionWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const { categoryId, courseId ,challengeId} = useParams()
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const [createQuestion] = useCreateQuestionMutation()

  const onClick = async () => {
    try {
      setErrorMsg(null)
      const addQuestionData = {
        question: wizardData.questionInfo.question,
        correctAnswer: wizardData.questionInfo.correctAnswer,
        options: wizardData.questionInfo.options,
        challengeId,
      }
      await createQuestion(addQuestionData).unwrap()
      dispatch(resetWizard())
      navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`)
    } catch (err) {
      console.error(err)
      setErrorMsg(err?.data?.message || err.message || "Error creating question")
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddQuestionInfo
            setQuestionInfo={setQuestionInfo}
            goToStep={goToStep}
            selectWizardStep={selectWizardStep}
            categoryId={categoryId}
          />
        )
      default:
        return (
          <FinalSaveButton
            onClick={onClick}
            disabled={!wizardData.questionInfo.question || !wizardData.questionInfo.correctAnswer}
          />
        )
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Question Wizard</h1>

      <NavigateButton
        navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`}
        buttonText={"🔙"}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[1, 2].map((s) => (
          <div
            key={s}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              background: step === s ? "blue" : "lightgray",
              color: step === s ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => dispatch(goToStep(s))}
          >
            {s}
          </div>
        ))}
      </div>

      {renderStep()}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  )
}

export default QuestionWizard