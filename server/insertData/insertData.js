//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const Category = require('../models/Category')
const Course = require('../models/Course')

//data
const { words, createQuestions, creatChallenges, createCategories, createCourses } = require('./data')

//functions 
// insert words to dataBase
const insertWord = async () => {
    let wordCounter = 0
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
    let questionCounter = 0
    const checkQuestions = await Question.find().lean()
    if (!checkQuestions.length) {
        // insert vegtable questions
        const questions = await createQuestions()
        for (let i = 0; i < questions.length; i++) {
            const newQuestion = await Question.create({
                question: questions[i].question,
                correctAnswer: questions[i].correctAnswer,
                options: questions[i].options,
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
    let challengeCounter = 0
    if (!checkChallenges.length) {
        const challenges = await creatChallenges()
        for (let i = 0; i < challenges.length; i++) {
            const newChallenge = await Challenge.create({
                questions: challenges[i].question
            })
            if (!newChallenge)
                console.log(`error creating challenge`)
            else
                challengeCounter++
        }
        console.log(`${challengeCounter} challenges were inserted successfully to challenges table`)
    }
}

//insert categories to database
const insertCategories = async () => {
    const checkCategoriea = await Category.find().lean()
    let categoriesCounter = 0
    if (!checkCategoriea.length) {
        const categories = await createCategories()
        for (let i = 0; i < categories.length; i++) {
            const newCategory = await Category.create({
                name: categories[i].name,
                wordsList: categories[i].wordsList,
                challenge: categories[i].challenge,
                level: categories[i].level
            })
            if (!newCategory)
                console.log(`error creating  categories ${categories[i].name}`)
            else
                categoriesCounter++
        }
        console.log(`${categoriesCounter} categories were inserted successfully to categories table`)
    }
    
}


// insert courses to dataBase
const insertCourses = async () => {
    let courseCounter = 0
    const checkCourse = await Course.find().lean()
    if (!checkCourse.length) {
        const courses = await createCourses()
        for (let i = 0; i < courses.length; i++) {
            const newCourse = await Course.create({
                level: courses[i].level,
                categories: courses[i].categories
            })
            if (!newCourse)
                onsole.log(`error creating course}`)
            else
                courseCounter++
        }
        console.log(`${courseCounter} courses were inserted successfully to courses table`)
    }
}


module.exports = { insertWord, insertQuestions, insertChallenges, insertCategories, insertCourses }