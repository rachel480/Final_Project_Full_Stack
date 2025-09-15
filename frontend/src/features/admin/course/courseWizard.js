import { useSelector, useDispatch } from "react-redux"
import {selectWizardStep,goToStep} from "./courseWizardSlice"
import AddCourseInfo from "./addCourseInfo"
import AddCategoriesInfo from "./addCategoriesInfo"
import AddChallengesInfo from "./addChallengesInfo"
import NavigateButton from "../../../components/navigateButton"
import AddWordsInfo from "./addWordsInfo"

const CourseWizard = () => {
  const step = useSelector(selectWizardStep)
  const dispatch = useDispatch()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddWordsInfo />
      case 2:
        return <AddCategoriesInfo />
      case 3:
        return <AddChallengesInfo />
      case 4:
        return <AddCourseInfo />
      default:
        return <div>סיימת 🎉</div>
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Course Wizard</h1>

      <NavigateButton navigation={"/user/admin/courses"} buttonText={"🔙"} />

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

    </div>
  )
}

export default CourseWizard