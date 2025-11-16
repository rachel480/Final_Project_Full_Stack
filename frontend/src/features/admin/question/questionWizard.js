import { useSelector, useDispatch } from "react-redux";
import { goToStep, selectWizardStep, selectWizardData, setQuestionInfo, resetWizard, } from "./questionWizardSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddQuestionInfo from "./addQuestionInfo";
import FinalSaveButton from "../common/finalSaveButton";
import { useCreateQuestionMutation } from "../../question/questionApi";
import WizardLayout from "../common/wizardLayout";
import { toast } from "react-toastify";
import wizardSteps from "../common/wizardSteps";

const QuestionWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const { categoryId, courseId, challengeId } = useParams()
  const navigate = useNavigate()

  const [createQuestion] = useCreateQuestionMutation()

  const handleStepChange = (number) => {
    dispatch(goToStep(number))
  }

  const onClick = async () => {
    try {

      if (!wizardData.questionInfo.question || !wizardData.questionInfo.correctAnswer) {
        toast.error("יש למלא את כל השדות לפני שמירה", {
          position: "top-right",
          autoClose: 3000,
        })
        return;
      }

      const addQuestionData = {
        question: wizardData.questionInfo.question,
        correctAnswer: wizardData.questionInfo.correctAnswer,
        options: wizardData.questionInfo.options,
        challengeId,
      }

      await createQuestion(addQuestionData).unwrap()
      dispatch(resetWizard())

      toast.success("השאלה נוצרה בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () =>  navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`)
      })
     
    } catch (err) {
      console.error(err)
      const msg = err?.data?.message || err.message || "שגיאה ביצירת שאלה"
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      })
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
    <WizardLayout
      title="יצירת שאלה - Wizard"
      steps={wizardSteps.questionSteps}
      step={step}
      onStepChange={handleStepChange}
      renderStep={renderStep}
      backNavigation={`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`}
    />
  )
}

export default QuestionWizard