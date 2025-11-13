import { useDispatch, useSelector } from "react-redux"
import { createChallengeForCategory } from "./services/challengeServices"
import { Box, Paper } from "@mui/material"
import FormTitle from "../../../components/formTitle"
import SubmitButton from "../../../components/submitButton"

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
    alert(`האתגר נוצר בהצלחה עבור הקטגוריות: ${categoriesWasAdded.join(' ,')} \nאת מוכנה/מוכן לשלב הבא!`)

    dispatch(goToStep(step + 1))
  }

  return (
    <Box className="flex flex-col gap-3 w-full max-w-md mx-auto p-4">

      <Paper elevation={3} className="flex flex-col gap-4 p-6 rounded-xl bg-white shadow-md">

        <FormTitle text="הוספת אתגרים" />
        <SubmitButton text={'הוספה'} onClick={() => handleChallengeData()} disabled={!categoryData.find(c => !c.challenge && c.words.length >= 10)} />

      </Paper>
    </Box>
  )
}

export default AddChallengesInfo