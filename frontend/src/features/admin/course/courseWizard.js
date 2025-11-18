import { useSelector, useDispatch } from "react-redux";
import { selectWizardStep, setWordInfo, setQuestionInfo, setChallengeInfo, goToStep, selectWizardWords, selectWizardCategory, setCategoryInfo, setCallengeInfoInCategory, selectWizardData, resetWizard, } from "./courseWizardSlice";
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

  const dataURLtoBlob = (dataurl, mimeType) => {
    const parts = dataurl.split(',');
    const b64 = parts.length > 1 ? parts[1] : parts[0];

    const byteString = atob(b64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeType });
  }

  const onClick = async () => {
    try {

      if (!wizardData.courseInfo?.name || !wizardData.categories?.length || !wizardData.challenges?.length || !wizardData.words?.length) {
        toast.error("יש למלא את כל השלבים לפני שמירה!", {
          position: "top-right",
          autoClose: 3000,
        })
        return
      }

      const formData = new FormData()

      const wordsData = wizardData.words.map((word) => {
        const { imgData, mimeType, ...rest } = word
        return rest
      })

      formData.append("courseInfo", JSON.stringify(wizardData.courseInfo))
      formData.append("categories", JSON.stringify(wizardData.categories))
      formData.append("questions", JSON.stringify(wizardData.questions))
      formData.append("challenges", JSON.stringify(wizardData.challenges))
      formData.append("words", JSON.stringify(wordsData))

      wizardData.words.forEach((word, index) => {
        if (word.imgData && word.mimeType) {
          try {
            const imageBlob = dataURLtoBlob(word.imgData, word.mimeType);
            const safeWord = (word.word || `word_${index}`).replace(/\s+/g, '_')
            formData.append(`images`, imageBlob, `${safeWord}-${index}.jpg`)
          } catch (e) {
            console.error("Error converting Base64 to Blob for word:", word.word, e);
          }
        }
      })

      await createFullCourse(formData).unwrap()

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
            disabled={!wizardData.courseInfo?.name || !wizardData.categories?.length || !wizardData.challenges?.length || !wizardData.words?.length}
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