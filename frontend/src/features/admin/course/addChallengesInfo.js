import { useDispatch, useSelector } from "react-redux"
import {  setChallengeInfo, goToStep, selectWizardCategory, setQuestionInfo, setChallengeInfoCategory } from "./courseWizardSlice"

//a function that checks if the word is already selected in options
const checkWordInoptions = (word, options) => {
  for (let i = 0; i < options.length; i++)
    if (options[i] === word)
      return true
  return false
}

//a function that gets an array and returns a new shuffled array
const shuffleArray = (arr) => {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
  return a
}

//a function that gets a categoryName and creates a category challenge
const createChallengeForCategory = (categoryInfo) => {
  //words
  const words = categoryInfo.words
  //questions array
  const questions = shuffleArray(words)
  const questionsWithAnswers = questions.map((question) => {
    //add correct answer
    const correctAnswer = question
    //add options
    //choose where will the corect answer be
    const correctPosition = Math.floor(Math.random() * 4)
    const options = []
    //insert random options to options
    for (let i = 0; i < 4; i++) {
      if (i === correctPosition)
        options.push(correctAnswer)
      else {
        let optionPosition = Math.floor(Math.random() * words.length)
        //check if the word is not the corrected word or unique in options
        while (checkWordInoptions(words[optionPosition], options) || words[optionPosition] === correctAnswer)
          optionPosition = Math.floor(Math.random() * words.length)
        options.push(words[optionPosition])
      }
    }
    return { question, correctAnswer, options }
  })

  //challenge object
  const challenge = { questions: questionsWithAnswers }
  return challenge
}

const AddChallengesInfo = () => {
  const dispatch = useDispatch()
  const categoryData = useSelector(selectWizardCategory)


  const handleChallengeData = () => {
    const categoriesWasAdded=[]
    //create the challenge for each category that adds a minimum of 10 words
    const categoriesWithChallenge = categoryData.map((category) => {
      if(category.words.length<10||category.challenge)
        return {...category,challenge:null}
      
      const challenge = createChallengeForCategory(category)
      dispatch(setChallengeInfo(challenge))
      challenge.questions.forEach((question) => {
        dispatch(setQuestionInfo(question))
      })
      categoriesWasAdded.push(category.name)
      return { ...category, challenge }

    })
    dispatch(setChallengeInfoCategory(categoriesWithChallenge))
    alert(`challenge was create successfuly for categories:${categoriesWasAdded.join(',')} \n  you are up to next step` )
    dispatch(goToStep(4))
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: "100%",
      maxWidth: 480,
      margin: "0 auto",
      padding: 14,
      border: "1px solid #eee",
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
      fontFamily:
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    }}>


      <h1>Add Challenges</h1>
      <button type="button" style={{ marginTop: 10, }} onClick={() => handleChallengeData()} disabled={!categoryData?.find((category)=>!category?.challenge&&category?.words?.length>=10)}>
        create challenge
      </button>
    </div>
  )
}

export default AddChallengesInfo