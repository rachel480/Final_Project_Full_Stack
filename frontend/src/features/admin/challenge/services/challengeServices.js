
// check if a word (by id) already exists in options
const checkWordInoptions = (word, options) => {
  const wordId = typeof word === "object" ? word._id?.toString() : word.toString()
  return options.some(opt => {
    const optId = typeof opt === "object" ? opt._id?.toString() : opt.toString()
    return optId === wordId
  })
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

//a function that creates a question
const createQuestionFromWord = (questionWord, allWords) => {
    const correctAnswer = questionWord._id || questionWord
    const correctPosition = Math.floor(Math.random() * 4)
    const options = []

    for (let i = 0; i < 4; i++) {
        if (i === correctPosition) {
            options.push(correctAnswer)
        } else {
            let optionPosition = Math.floor(Math.random() * allWords.length)
            while (
                checkWordInoptions(allWords[optionPosition], options) ||
                allWords[optionPosition] === correctAnswer
            ) {
                optionPosition = Math.floor(Math.random() * allWords.length)
            }
            const option = allWords[optionPosition]._id || allWords[optionPosition]
            options.push(option)
        }
    }

    return { question: questionWord._id || questionWord, correctAnswer, options }
}

const createChallengeForCategory = (categoryInfo) => {
    const words = categoryInfo.words
    const questions = shuffleArray(words)
    const questionsWithAnswers = questions.map((word) =>
        createQuestionFromWord(word, words)
    )

    return { questions: questionsWithAnswers }
}

module.exports = { createChallengeForCategory, shuffleArray, checkWordInoptions,createQuestionFromWord }