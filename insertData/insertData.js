//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const challenge = require('../models/Challenge')

//data
const { words, creatVegtablesQuestions, creatVegtableChallenge } = require('./data')
const Challenge = require('../models/Challenge')
//functions 
// insert words to dataBase
const insertWord = async () => {
    const checkWords = await Word.find().lean()
    if (!checkWords.length) {
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
// insert questions to dataBase
const insertQuestions = async () => {
    const checkQuestions = await Question.find().lean()
    if (!checkQuestions.length) {
        // insert vegtable questions
        const vegtablesQuestions = await creatVegtablesQuestions()
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

//insert challenges to dataBase
const insertChallenges = async () => {
    const checkChallenges = await Challenge.find().lean()
    if (!checkChallenges.length) {
        //insert vegtable challenge 
        const vegtableChallenge = await creatVegtableChallenge()
        const newChallenge = await Challenge.create({
            questions: vegtableChallenge.question
        })
        if(!newChallenge)
            console.log(`error creating vegtable challenge`)
        console.log('challenges table was filled successfully')
    }
}

module.exports = { insertWord, insertQuestions,insertChallenges }