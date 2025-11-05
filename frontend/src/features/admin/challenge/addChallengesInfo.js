import { useDispatch, useSelector } from "react-redux"
import {createChallengeForCategory} from "./services/challengeServices"

const AddChallengesInfo = ({ setChallengeInfo, goToStep, selectWizardCategory, setQuestionInfo, setCallengeInfoInCategory, selectWizardStep }) => {

  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)
  const categoryData = useSelector(selectWizardCategory)

  const handleChallengeData = () => {
    const categoriesWasAdded = []

    //create the challenge for each category that adds a minimum of 10 words
    const categoriesWithChallenge = categoryData.map((category) => {
      if (category.words.length < 10 || category.challenge)
        return { ...category, challenge: null }
      //create challenge
      const challenge = createChallengeForCategory(category)
      //add challenge to slice
      dispatch(setChallengeInfo(challenge))
      //add question to slice
      challenge.questions.forEach((question) => {
        dispatch(setQuestionInfo(question))
      })
      categoriesWasAdded.push(category.name)
      //return categories with challenges
      return { ...category, challenge }
    })
    //update category slice
    dispatch(setCallengeInfoInCategory(categoriesWithChallenge))
    alert(`challenge was created successfully for categories: ${categoriesWasAdded.join(' ,')} \n you are up to next step"`)

    dispatch(goToStep(step+1))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 480, margin: "0 auto", padding: 14, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(16,24,40,0.04)", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", }}>
      <h1>Create Challenges</h1>

      <button type="button" style={{ marginTop: 10 }} onClick={() => handleChallengeData()} disabled={!categoryData.find(c => !c.challenge && c.words.length >= 10)}>
        Create challenge
      </button>

    </div>
  )
}

export default AddChallengesInfo