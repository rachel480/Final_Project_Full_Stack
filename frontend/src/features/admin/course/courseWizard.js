import { useSelector, useDispatch } from "react-redux";
import { selectWizardStep, setWordInfo, setQuestionInfo, setChallengeInfo, goToStep, selectWizardWords, selectWizardCategory, setCategoryInfo, setCallengeInfoInCategory, selectWizardData, resetWizard,} from "./courseWizardSlice";
import AddCourseInfo from "./addCourseInfo";
import AddChallengesInfo from "../challenge/addChallengesInfo";
import AddWordsInfo from "../word/addWordsInfo";
import AddCategoriesInfo from "../category/addCategoriesInfo";
import FinalSaveButton from "../common/finalSaveButton";
import { useCreateFullCourseSimpleMutation } from "../../course/courseApi";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../common/wizardLayout";
import wizardSteps from "../common/wizardSteps";
import { toast } from "react-toastify";

const CourseWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [createFullCourse] = useCreateFullCourseSimpleMutation();

  const handleStepChange = (number) => {
    dispatch(goToStep(number))
  }

  const onClick = async () => {
    try {

      if ( !wizardData.courseInfo?.name || !wizardData.categories?.length || !wizardData.challenges?.length || !wizardData.words?.length) {
        toast.error("יש למלא את כל השלבים לפני שמירה!", {
        position: "top-right",
        autoClose: 3000,
      })
        return
      }

      const addCourseData = {
        courseInfo: wizardData.courseInfo,
        categories: wizardData.categories,
        words: wizardData.words,
        questions: wizardData.questions,
        challenges: wizardData.challenges,
      }

      await createFullCourse(addCourseData).unwrap()

      dispatch(resetWizard())

      toast.success("הקורס נוצר בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/user/admin/data/courses")
      })

    } catch (err) {
      console.error(err);
      const msg = err?.data?.message || err.message || "שגיאה ביצירת קורס";
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
        )

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
        )

      case 4:
        return <AddCourseInfo />

      default:
        return (
          <FinalSaveButton
            onClick={onClick}
            disabled={ !wizardData.courseInfo?.name || !wizardData.categories?.length || !wizardData.challenges?.length || !wizardData.words?.length }
          />
        )
    }
  }

  return (
    <WizardLayout
      title="יצירת קורס - Wizard"
      steps={wizardSteps.courseSteps}
      step={step}
      onStepChange={handleStepChange}
      renderStep={renderStep}
      backNavigation="/user/admin/data/courses"
    />
  )
}

export default CourseWizard