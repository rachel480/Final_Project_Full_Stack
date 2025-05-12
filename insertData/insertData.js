//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const Category=require('../models/Category')

//data
const { words, creatVegtablesQuestions, creatVegtableChallenge ,createVegtableCategory} = require('./data')

//functions 
// insert words to dataBase
const insertWord = async () => {
    let wordCounter=0
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
            else
                wordCounter++
        }
        console.log(`${wordCounter} words were inserted successfully to words table`)
    }
}
// insert questions to dataBase
const insertQuestions = async () => {
    let questionCounter=0
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
            else 
                questionCounter++
        }
        console.log(`${questionCounter} questions were inserted successfully to questions table`)
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
        if(!newChallenge){
            console.log(`error creating vegtable challenge`)
            return
        }
            
        console.log('challenges table was filled successfully')
    }
}

//insert categories to database
const insertCategories=async()=>{
    const checkCategoriea=await Category.find().lean()
    if(!checkCategoriea.length){
        //insert vegtable category
        const vegtabltCategory=await createVegtableCategory()
        const newCategory=await Category.create({
            name:vegtabltCategory.name,
            wordsList:vegtabltCategory.wordsList,
            challenge:vegtabltCategory.challenge
        })
        if(!newCategory){
            console.log(`error creating vegtable categories`)
            return
        }
            
        console.log('categories table was filled successfully')
    }
}


module.exports = { insertWord, insertQuestions,insertChallenges,insertCategories }