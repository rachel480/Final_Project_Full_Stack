//models
const Word = require('../models/Word')
const Question = require('../models/Question')

//data
const { words, creatVegtablesQuestions } = require('./data')
//functions
const insertWord = async () => {
    const chekWords = await Word.find().lean()
    if (!chekWords.length) {
        for (let i = 0; i < words.length; i++) {
            const newWord = await Word.create({
                word: words[i].word,
                translation: words[i].translation,
                categoryName: words[i].categoryName,
                img: {
                    data: words[i].img.data,
                    contentType: words[i].img.contentType
                }
            })
            if (!newWord)
                console.log(`error creating wordL${words[i].word}`)
        }
        console.log('words table was filled successfully')
    }
    else
      return
}
const insertQuestions = async () => {
    const chekQuestions = await Question.find().lean()
    if (!chekQuestions.length) {
        // insert vegtable questions
        const vegtablesQuestions=await creatVegtablesQuestions()
        for (let i = 0; i < vegtablesQuestions.length; i++) {
            const newQuestion = await Question.create({
                question: vegtablesQuestions[i].question,
                correctAnswer: vegtablesQuestions[i].correctAnswer,
                options: vegtablesQuestions[i].options,
            })
            if (!newQuestion)
                console.log(`error creating vegtable question`)

        }
        console.log('questions table was filled successfully')

    }

}

module.exports = { insertWord, insertQuestions }