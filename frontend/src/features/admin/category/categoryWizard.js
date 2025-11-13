import { useSelector, useDispatch } from "react-redux";
import { goToStep, selectWizardWords, setChallengeInfo, setWordInfo, selectWizardStep, setCategoryInfo, selectWizardCategory, setQuestionInfo, setCallengeInfoInCategory, selectWizardData, resetWizard, } from "./categoryWizardSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddWordsInfo from "../word/addWordsInfo";
import AddCategoriesInfo from "./addCategoriesInfo";
import AddChallengesInfo from "../challenge/addChallengesInfo";
import FinalSaveButton from "../common/finalSaveButton";
import { useCreateFullCategorySimpleMutation } from "../../category/categoryApi";
import WizardLayout from "../common/wizardLayout";
import wizardSteps from "../common/wizardSteps";
import { toast } from "react-toastify";

const CategoryWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [createFullCategorySimple] = useCreateFullCategorySimpleMutation()

  const handleStepChange = (number) => {
    dispatch(goToStep(number))
  }

  const onClick = async () => {
    try {

      const addCategoryData = {
        categoryInfo: wizardData.categoryInfo,
        questions: wizardData.questions,
        words: wizardData.words,
        courseId,
      }

      await createFullCategorySimple(addCategoryData).unwrap()

      dispatch(resetWizard());
      toast.success("הקטגוריה נוצרה בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate(`/user/admin/data/courses/${courseId}`)
      })
    } catch (err) {
      console.error(err)
      const msg = err?.data?.message || err.message || "שגיאה ביצירת קטגוריה"
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
          <AddWordsInfo
            selectWizardWords={selectWizardWords}
            setWordInfo={setWordInfo}
            goToStep={goToStep}
            selectWizardStep={selectWizardStep}
          />
        )
      case 2:
        return (
          <AddCategoriesInfo
            setCategoryInfo={setCategoryInfo}
            goToStep={goToStep}
            selectWizardCategory={selectWizardCategory}
            selectWizardWords={selectWizardWords}
            selectWizardStep={selectWizardStep}
            selectWizardData={selectWizardData}
          />
        );
      case 3:
        return (
          <AddChallengesInfo
            setChallengeInfo={setChallengeInfo}
            goToStep={goToStep}
            selectWizardCategory={selectWizardCategory}
            setQuestionInfo={setQuestionInfo}
            setCallengeInfoInCategory={setCallengeInfoInCategory}
            selectWizardStep={selectWizardStep}
          />
        );
      default:
        return (
          <FinalSaveButton
            onClick={onClick}
            disabled={
              !wizardData.categoryInfo?.name ||
              !wizardData?.challenge ||
              !wizardData.words?.length
            }
          />
        )
    }
  }

  return (
    <WizardLayout
      title="יצירת קטגוריה - Wizard"
      steps={wizardSteps.categorySteps}
      step={step}
      onStepChange={handleStepChange}
      renderStep={renderStep}
      backNavigation={`/user/admin/data/courses/${courseId}`}
    />
  )
}

export default CategoryWizard