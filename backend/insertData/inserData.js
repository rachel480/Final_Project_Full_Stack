//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const Category = require('../models/Category')
const Course = require('../models/Course')

//data
const { words, createQuestions, createChallenges, createCategories, createCourses } = require('./data')


//functions
//insert words to database
const insertWords = async () => {
    const checkWords = await Word.find().lean()
    let wordCounter = 0
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
                console.log(`error creating word: ${words[i].word}`)
            else
                wordCounter++
        }
        console.log(`${wordCounter} words were inserted successfully to words table`)
    }
}

//insert questions to database
const insertQuestions = async () => {
    const checkQuestions = await Question.find().lean()
    let questionCounter = 0
    if (!checkQuestions.length) {
        const questions = await createQuestions()
        for (let i = 0; i < questions.length; i++) {
            const newQuestion = await Question.create({
                question: questions[i].question,
                correctAnswer: questions[i].correctAnswer,
                options: questions[i].options,
            })

            if (!newQuestion)
                console.log(`error creating question`)
            else
                questionCounter++
        }
        console.log(`${questionCounter} questions were inserted successfully to questions table`)
    }
}

//insert challenges to database
const insertChallenges = async () => {
    const checkChallenges = await Challenge.find().lean()
    let challengesCounter = 0

    if (!checkChallenges.length) {
        const challenges = await createChallenges()
        for (let i = 0; i < challenges.length; i++) {
            const newChallenge = await Challenge.create({
                questions: challenges[i].questions
            })

            if (!newChallenge)
                console.log(`error creating challenge`)
            else
                challengesCounter++
        }
        console.log(`${challengesCounter} challenges were inserted successfully to challenges table`)
    }
}

//insert categories to database
const insertCategories = async () => {
    const checkCategories = await Category.find().lean()
    let categoriesCounter=0

    if (!checkCategories.length) {
        const categories = await createCategories()
        for (let i = 0; i < categories.length; i++) {
            const newCategory = await Category.create({
                name: categories[i].name,
                words: categories[i].words,
                challenge: categories[i].challenge,
                level:categories[i].level
            })

            if (!newCategory) 
               console.log(`error creating category ${categories[i].name}`)
            else
               categoriesCounter++
        }
        console.log(`${categoriesCounter} categories were inserted successfully to categories table`)
    }
}

//insert courses to database
const insertCourses = async () => {
    const checkCourses = await Course.find().lean()
    let courseCounter = 0
    if (!checkCourses.length) {
        const courses = await createCourses()
        for (let i = 0; i < courses.length; i++) {
            const newCourse = await Course.create({
                level: courses[i].level,
                categories: courses[i].categories
            })

            if (!newCourse)
                console.log(`error creating course`)
            else
                courseCounter++
        }
        console.log(`${courseCounter} courses were inserted successfully to courses table`)
    }
}


module.exports = { insertWords, insertQuestions, insertChallenges, insertCategories, insertCourses }