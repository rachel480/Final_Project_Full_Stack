const fs = require("fs")
const path = require("path")

//models
const Word = require('../models/Word')
const Question = require("../models/Question")
const Challenge = require('../models/Challenge')
const Category = require('../models/Category')
const { machine } = require("os")

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
    { word: "pepper", translation: "פלפל", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vegtables", "pepper.jpg")), contentType: "jpg" } },
    { word: "cucumber", translation: "מלפפון", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","cucumber.jpg")), contentType: "jpg" } },
    { word: "tomato", translation: "עגבניה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","tomato.jpg")), contentType: "jpg" } },
    { word: "potato", translation: "תפוח אדמה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","potato.jpg")), contentType: "jpg" } },
    { word: "eggplant", translation: "חציל", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","eggplant.jpg")), contentType: "jpg" } },
    { word: "onion", translation: "בצל", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","onion.jpg")), contentType: "jpg" } },
    { word: "sweet potato", translation: "בטטה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","sweet potato.jpg")), contentType: "jpg" } },
    { word: "carrot", translation: "גזר", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","carrot.jpg")), contentType: "jpg" } },
    { word: "mushroom", translation: "פטריה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","mushroom.jpg")), contentType: "jpg" } },
    { word: "lettuce", translation: "חסה", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","lettuce.jpg")), contentType: "jpg" } },
    { word: "garlic", translation: "שום", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","garlic.jpg")), contentType: "jpg" } },
    { word: "cabbage", translation: "כרוב", categoryName: "vegtables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegtables","cabbage.jpg")), contentType: "jpg" } },
    
    //vehicles
    { word: "airplane", translation: "מטוס", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "airplane.jpg")), contentType: "jpg" } },
    { word: "ambulance", translation: "אמבולנס", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "ambulance.jpg")), contentType: "jpg" } },
    { word: "bike", translation: "אופנעים", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "bike.jpg")), contentType: "jpg" } },
    { word: "boat", translation: "סירה", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "boat.jpg")), contentType: "jpg" } },
    { word: "bus", translation: "אוטובוס", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "bus.jpg")), contentType: "jpg" } },
    { word: "cable car", translation: "רכבלית", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "cablecar.jpg")), contentType: "jpg" } },
     { word: "car", translation: "רכב", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "car.jpg")), contentType: "jpg" } },
    { word: "helicopter", translation: "מסוק", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "helicopter.jpg")), contentType: "jpg" } },
    { word: "motorcycle", translation: "אופנוע", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "motorcycle.jpg")), contentType: "jpg" } },
    { word: "ship", translation: "אנייה", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "ship.jpg")), contentType: "jpg" } },
    { word: "train", translation: "רכבת", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "train.jpg")), contentType: "jpg" } },
    { word: "truck", translation: "משאית", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images","vehicles", "truck.jpg")), contentType: "jpg" } },

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
    
    //create object category
    const category = { name: "vegtables", challenge: filteredChallenges, level: "Easy" }
    return category
}

//course 
const createCourses = async () => {
    //find all the categories 
    const easyCategoriesFromDB = await Category.find({ level: "Easy" }).lean()
    const mediumCategoriesFromDB = await Category.find({ level: "Medium" }).lean()
    const hardCategoriesFromDB = await Category.find({ level: "Hard" }).lean()

    const courses=[
        {level:"Easy",categories:easyCategoriesFromDB},
        {level:"Medium",categories:mediumCategoriesFromDB},
        {level:"Hard",categories:hardCategoriesFromDB}
    ]
    return courses

}


module.exports = { words, creatVegtablesQuestions, creatVegtableChallenge, createVegtableCategory,createCourses }