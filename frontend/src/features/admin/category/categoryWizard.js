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
      const formData = new FormData()

      const wordsData = wizardData.words.map((word) => {
        const { imgData, mimeType, ...rest } = word
        return rest
      })

      formData.append("categoryInfo", JSON.stringify(wizardData.categoryInfo))
      formData.append("questions", JSON.stringify(wizardData.questions))
      formData.append("words", JSON.stringify(wordsData))
      formData.append("courseId", courseId)

      wizardData.words.forEach((word, index) => {
        if (word.imgData && word.mimeType) {
          try {
            const imageBlob = dataURLtoBlob(word.imgData, word.mimeType);

            formData.append(`images`, imageBlob, word.word + "-" + index + ".jpg")
          } catch (e) {
            console.error("Error converting Base64 to Blob for word:", word.word, e);
          }
        }
      })

      await createFullCategorySimple(formData).unwrap()

      dispatch(resetWizard())

      toast.success("הקטגוריה נוצרה בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate(`/user/admin/data/courses/${courseId}`)
      });

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