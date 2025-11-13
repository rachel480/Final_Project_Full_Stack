import { useSelector, useDispatch } from "react-redux";
import { goToStep, selectWizardStep, selectWizardData, setChallengeInfo, resetWizard,} from "./challengeWizardSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddChallengeInfo from "./addChallengeInfo";
import FinalSaveButton from "../common/finalSaveButton";
import { useCreateFullChallengeMutation } from "../../challenge/challengeApi";
import WizardLayout from "../common/wizardLayout";
import { toast } from "react-toastify";
import wizardSteps from "../common/wizardSteps";

const ChallengeWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const { categoryId, courseId } = useParams()
  const navigate = useNavigate()

  const [createFullChallenge] = useCreateFullChallengeMutation()

  const handleStepChange = (number) => {
    dispatch(goToStep(number))
  }

  const onClick = async () => {
    try {

      if (!wizardData.challengeInfo.questions.length) {
        toast.error("יש למלא לפחות שאלה אחת כדי לשמור את האתגר.", {
        position: "top-right",
        autoClose: 3000,
      })
        return
      }

      const addChallengeData = {
        questions: wizardData.challengeInfo.questions,
        categoryId,
      }

      await createFullChallenge(addChallengeData).unwrap()
      dispatch(resetWizard())
      toast.success("האתגר נוצרה בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
      })
    } catch (err) {
      console.error(err);
      const msg = err?.data?.message || err.message || "שגיאה ביצירת אתגר"
      toast.error(msg, { position: "top-right", autoClose: 3000 })
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddChallengeInfo
            setChallengeInfo={setChallengeInfo}
            goToStep={goToStep}
            selectWizardStep={selectWizardStep}
            categoryId={categoryId}
          />
        );
      default:
        return (
          <FinalSaveButton
            onClick={onClick}
            disabled={!wizardData.challengeInfo.questions.length}
          />
        )
    }
  }

  return (
    <WizardLayout
      title="יצירת אתגר - Wizard"
      steps={wizardSteps.challengeSteps}
      step={step}
      onStepChange={handleStepChange}
      renderStep={renderStep}
      backNavigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`}
    />
  )
}

export default ChallengeWizard