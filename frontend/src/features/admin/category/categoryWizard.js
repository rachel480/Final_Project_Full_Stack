import { useSelector, useDispatch } from "react-redux"
import { goToStep, selectWizardWords, setChallengeInfo, setWordInfo, selectWizardStep, setCategoryInfo, selectWizardCategory, setQuestionInfo, setCallengeInfoInCategory, selectWizardData, resetWizard } from "./categoryWizardSlice"
import NavigateButton from "../../../components/navigateButton"
import { useParams,useNavigate } from "react-router-dom"
import AddWordsInfo from "../word/addWordsInfo"
import AddCategoriesInfo from "./addCategoriesInfo"
import AddChallengesInfo from "../challenge/addChallengesInfo"
import FinalSaveButton from "../common/finalSaveButton"
import { useState } from "react"
import { useCreateFullCategorySimpleMutation } from "../../category/categoryApi"

const CategoryWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const [createFullCategorySimple ] = useCreateFullCategorySimpleMutation()

  const onClick = async () => {
    try {
      setErrorMsg(null)
      const addCategoryData = {
        categoryInfo: wizardData.categoryInfo,
        questions: wizardData.questions,
        words: wizardData.words,
        courseId
      }
      await createFullCategorySimple(addCategoryData)
      dispatch(resetWizard())
      navigate(`/user/admin/data/courses/${courseId}`)
    }
    catch (err) {
      console.error(err)
      setErrorMsg(err?.data?.message || err.message || "Error creating course")
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddWordsInfo selectWizardWords={selectWizardWords} setWordInfo={setWordInfo} goToStep={goToStep} selectWizardStep={selectWizardStep} />
      case 2:
        return <AddCategoriesInfo setCategoryInfo={setCategoryInfo} goToStep={goToStep} selectWizardCategory={selectWizardCategory} selectWizardWords={selectWizardWords} selectWizardStep={selectWizardStep} selectWizardData={selectWizardData}/>
      case 3:
        return <AddChallengesInfo setChallengeInfo={setChallengeInfo} goToStep={goToStep} selectWizardCategory={selectWizardCategory} setQuestionInfo={setQuestionInfo} setCallengeInfoInCategory={setCallengeInfoInCategory} selectWizardStep={selectWizardStep} />
      default:
        return <FinalSaveButton onClick={onClick} disabled={!wizardData.categoryInfo.name || !wizardData.challenge || !wizardData.words.length} />
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Category Wizard</h1>

      <NavigateButton navigation={`/user/admin/data/courses/${courseId}`} buttonText={"🔙"} />

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[1, 2, 3, 4].map((s) => (
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

export default CategoryWizard