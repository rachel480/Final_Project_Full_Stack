import { useSelector, useDispatch } from "react-redux";
import { goToStep, selectWizardStep, selectWizardData, setWordInfo, resetWizard } from "./wordWizardSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddWordForm from "./addWordForm";
import FinalSaveButton from "../common/finalSaveButton";
import { useCreateNewWordMutation } from "../../word/wordApi";
import WizardLayout from "../common/wizardLayout";
import wizardSteps from "../common/wizardSteps";
import { useGetCategoryByIdQuery } from "../../category/categoryApi";
import { toast } from "react-toastify";

const WordWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const { categoryId, courseId } = useParams()
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId)
  const navigate = useNavigate()

  const [createNewWord] = useCreateNewWordMutation()

  if (isLoading) return <p>טוען...</p>;
  if (error) return <p>{error?.data || "משהו השתבש"}</p>;
  if (!category) return <p>לא נמצאה קטגוריה</p>;

  const handleStepChange = (number) => {
    dispatch(goToStep(number));
  };

  const onClick = async () => {
    try {

      if (!wizardData.wordInfo.word || !wizardData.wordInfo.translation) {
        toast.error("יש למלא את כל השדות לפני שמירה", {
        position: "top-right",
        autoClose: 3000,
      })
        return
      }

      const addWordData = {
        word: wizardData.wordInfo.word,
        translation: wizardData.wordInfo.translation,
        img: wizardData.wordInfo.img,
        categoryName: category.name,
        categoryId
      }

      await createNewWord(addWordData).unwrap()

      toast.success("המילה נוצרה בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          const addQuestion = window.confirm('Would you like to add a question for this word?')
          if (addQuestion)
            navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${category?.challenge}/question/add`)
          else
            navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
        }
      })
      dispatch(resetWizard())
    } catch (err) {
      console.error(err)
      const msg = err?.data?.message || err.message || "שגיאה ביצירת מילה"
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
          <AddWordForm
            wordInfo={wizardData.wordInfo}
            setWordInfo={(data) => dispatch(setWordInfo(data))}
          />
        )
      default:
        return (
          <FinalSaveButton
            onClick={onClick}
            disabled={!wizardData.wordInfo.word || !wizardData.wordInfo.translation}
          />
        )
    }
  }

  return (
    <WizardLayout
      title="הוספת מילה - Wizard"
      steps={wizardSteps.wordSteps}
      step={step}
      onStepChange={handleStepChange}
      renderStep={renderStep}
      backNavigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`}
    />
  )
}

export default WordWizard
