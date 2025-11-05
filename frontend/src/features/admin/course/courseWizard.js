import { useSelector, useDispatch } from "react-redux"
import { selectWizardStep, setWordInfo, setQuestionInfo, setChallengeInfo, goToStep, selectWizardWords, selectWizardCategory, setCategoryInfo, setCallengeInfoInCategory } from "./courseWizardSlice"
import AddCourseInfo from "./addCourseInfo"
import AddChallengesInfo from "../challenge/addChallengesInfo"
import NavigateButton from "../../../components/navigateButton"
import AddWordsInfo from "../word/addWordsInfo"
import AddCategoriesInfo from "../category/addCategoriesInfo"
import { useState } from "react"
import { useCreateFullCourseSimpleMutation } from "../../course/courseApi"
import { useNavigate } from "react-router-dom"
import {selectWizardData, resetWizard } from './courseWizardSlice'
import FinalSaveButton from "../common/finalSaveButton"

const CourseWizard = () => {
  const step = useSelector(selectWizardStep)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const wizardData = useSelector(selectWizardData)
  const [createFullCourse] = useCreateFullCourseSimpleMutation()

    const onClick = async () => {
    try {
      setErrorMsg(null)
      if(!wizardData.courseInfo.name || !wizardData.categories.length || !wizardData.challenges.length || !wizardData.words.length)
        return 
      const addCourseData = { courseInfo: wizardData.courseInfo, categories: wizardData.categories, words: wizardData.words, questions: wizardData.questions, challenges: wizardData.challenges }
      await createFullCourse(addCourseData).unwrap()
      dispatch(resetWizard())
      navigate("/user/admin/data/courses")
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
      case 4:
        return <AddCourseInfo />
      default:
        return <FinalSaveButton onClick={onClick} disabled={!wizardData.courseInfo.name || !wizardData.categories.length || !wizardData.challenges.length || !wizardData.words.length}/>
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Course Wizard</h1>

      <NavigateButton navigation={"/user/admin/data/courses"} buttonText={"🔙"} />

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((s) => (
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

export default CourseWizard