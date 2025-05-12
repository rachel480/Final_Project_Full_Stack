const fs = require("fs")
const path = require("path")

//models
const Word = require('../models/Word')
const Question = require("../models/Question")
const Challenge = require('../models/Challenge')

//functions

//help function that chekes if the word is already selected in questions
const chekWordInQuestion = (id, questionArr) => {
    for (let i = 0; i < questionArr.length; i++) {
        if (questionArr[i].question === id)
            return true
    }
    return false
}
//help function that chekes if the word is already selected in options
const chekWordInOptions = (id, options) => {
    for (let i = 0; i < options.length; i++) {
        if (options[i] === id)
            return true
    }
    return false
}

//data

const words = [
    //vegtables
    { word: "pepper", translation: "פלפל", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "pepper.jpg")), contentType: "jpg" } },
    { word: "cucumber", translation: "מלפפון", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "cucumber.jpg")), contentType: "jpg" } },
    { word: "tomato", translation: "עגבניה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "tomato.jpg")), contentType: "jpg" } },
    { word: "potato", translation: "תפוח אדמה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "potato.jpg")), contentType: "jpg" } },
    { word: "eggplant", translation: "חציל", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "eggplant.jpg")), contentType: "jpg" } },
    { word: "onion", translation: "בצל", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "onion.jpg")), contentType: "jpg" } },
    { word: "sweet potato", translation: "בטטה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "sweet potato.jpg")), contentType: "jpg" } },
    { word: "carrot", translation: "גזר", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "carrot.jpg")), contentType: "jpg" } },
    { word: "mushroom", translation: "פטריה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "mushroom.jpg")), contentType: "jpg" } },
    { word: "lettuce", translation: "חסה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "lettuce.jpg")), contentType: "jpg" } },
    { word: "garlic", translation: "שום", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "garlic.jpg")), contentType: "jpg" } },
    { word: "cabbage", translation: "כרוב", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "cabbage.jpg")), contentType: "jpg" } }
]
//vegtable questions
const creatVegtablesQuestions = async () => {
    const wordsFromDB = await Word.find({ categoryName: "vegtables" }).lean() //get all words that category is vegtable
    const vegtablesQuestions = []
    for (let i = 0; i < wordsFromDB.length; i++)//loop that chooses in every round a word for the question
    {
        let wordPosition = Math.floor(Math.random() * wordsFromDB.length)
        while (chekWordInQuestion(wordsFromDB[wordPosition]._id, vegtablesQuestions)) {
            wordPosition = Math.floor(Math.random() * wordsFromDB.length)
        }
        vegtablesQuestions.push({ question: wordsFromDB[wordPosition]._id, correctAnswer: wordsFromDB[wordPosition]._id, options: [] })
        const correctPosition = Math.floor(Math.random() * 4)//choose where will the corect answer be
        for (let j = 0; j < 4; j++) //insert random options to options
        {
            if (j === correctPosition)
                vegtablesQuestions[i].options.push(wordsFromDB[wordPosition]._id)
            else {
                let optionPosition = Math.floor(Math.random() * wordsFromDB.length)
                //chek if the word is not the corrected word or unique in options
                while (chekWordInOptions(wordsFromDB[optionPosition]._id, vegtablesQuestions[i].options) || wordsFromDB[optionPosition]._id === wordsFromDB[wordPosition]._id)
                    optionPosition = Math.floor(Math.random() * wordsFromDB.length)
                vegtablesQuestions[i].options.push(wordsFromDB[optionPosition]._id)
            }
        }
    }
    return vegtablesQuestions
}

//vegtable challenge
const creatVegtableChallenge = async () => {
    const questionsFromDB = await Question.find().populate({//find all question that the word is un category of vegtable
        path: "question",
        match: { categoryName: "vegtables" }
    }).lean()
    const filteredQuestions = questionsFromDB.filter((q) => {
        return q.question !== null
    })
    //create object challenge
    const challenge = { question: filteredQuestions }
    return challenge
}

//vegtable category
const createVegtableCategory = async () => {
    const challengeFromDB = await Challenge.find({}, { questions: 1 }).lean()
    const filteredChallenges = challengeFromDB.find(async (challenge) => {
        const foundQuestion = await Question.findById(challenge.questions[0]).lean()
        const foundWord = await Word.findById(foundQuestion.question).lean()

        return foundWord.categoryName === "vegtables"
    })

    //find the vegtable category
    const wordsFromDB = await Word.find({ categoryName: "vegtables" }).lean() //get all words that category is vegtable
     //create object category
    const category={name:"vegtables",wordsList:wordsFromDB,challenge:filteredChallenges}
    return category

}
module.exports = { words, creatVegtablesQuestions, creatVegtableChallenge,createVegtableCategory }