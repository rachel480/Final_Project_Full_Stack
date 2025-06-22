const path = require('path')
const fs = require('fs')

//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const Category = require('../models/Category')

//functions
//help function that checks if the word is already selected in questions
const chekWordInQuestions = (id, questionArr) => {
    for (let i = 0; i < questionArr.length; i++)
        if (questionArr[i].question === id)
            return true
    return false
}

//help function that checks if the word is already selected in options
const chekWordInoptions = (id, options) => {
    for (let i = 0; i < options.length; i++)
        if (options[i] === id)
            return true
    return false
}

//creates questions acording to the parameter category
const createQuestionsAcordingToCategory = async (categoryName) => {
    const questionArr = []
    const wordsFromDB = await Word.find({ categoryName: categoryName }).lean()//get all words that category is vegtables
    for (let i = 0; i < wordsFromDB.length; i++)//loop that chooses in every round a word for the question
    {
        let wordPosition = Math.floor(Math.random() * wordsFromDB.length)//chooses the word
        while (chekWordInQuestions(wordsFromDB[wordPosition]._id, questionArr))
            wordPosition = Math.floor(Math.random() * wordsFromDB.length)

        questionArr.push({ question: wordsFromDB[wordPosition]._id, correctAnswer: wordsFromDB[wordPosition]._id, options: [] })
        const correctPosition = Math.floor(Math.random() * 4)//choose where will the corect answer be
        for (let j = 0; j < 4; j++)//insert random options to options
        {
            if (j === correctPosition)
                questionArr[i].options.push(wordsFromDB[wordPosition]._id)
            else {
                let optionPosition = Math.floor(Math.random() * wordsFromDB.length)
                //chek if the word is not the corrected word or unique in options
                while (chekWordInoptions(wordsFromDB[optionPosition]._id, questionArr[i].options) || wordsFromDB[optionPosition]._id === wordsFromDB[wordPosition]._id)
                    optionPosition = Math.floor(Math.random() * wordsFromDB.length)

                questionArr[i].options.push(wordsFromDB[optionPosition]._id)
            }
        }
    }
    return questionArr
}


//data
const categoryList = ["vegetables", "vehicles", "fruits", "numbers", "animals", "colors", "furniture & Electrical"]

const words = [
    //vegtables words
    { word: "pepper", translation: "פלפל", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "pepper.jpg")), contentType: "jpg" } },
    { word: "cucumber", translation: "מלפפון", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "cucumber.jpg")), contentType: "jpg" } },
    { word: "tomato", translation: "עגבניה", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "tomato.jpg")), contentType: "jpg" } },
    { word: "potato", translation: "תפוח אדמה", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "potato.jpg")), contentType: "jpg" } },
    { word: "eggplant", translation: "חציל", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "eggplant.jpg")), contentType: "jpg" } },
    { word: "onion", translation: "בצל", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "onion.jpg")), contentType: "jpg" } },
    { word: "sweet potato", translation: "בטטה", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "sweet potato.jpg")), contentType: "jpg" } },
    { word: "carrot", translation: "גזר", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "carrot.jpg")), contentType: "jpg" } },
    { word: "mushroome", translation: "פטריה", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "mushroom.jpg")), contentType: "jpg" } },
    { word: "lettuce", translation: "חסה", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "lettuce.jpg")), contentType: "jpg" } },
    { word: "garlic", translation: "שום", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "garlic.jpg")), contentType: "jpg" } },
    { word: "cabbage", translation: "כרוב", categoryName: "vegetables", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vegetables", "cabbage.jpg")), contentType: "jpg" } },

    //vehicles
    { word: "airplane", translation: "מטוס", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "airplane.jpg")), contentType: "jpg" } },
    { word: "ambulance", translation: "אמבולנס", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "ambulance.jpg")), contentType: "jpg" } },
    { word: "bike", translation: "אופניים", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "bike.jpg")), contentType: "jpg" } },
    { word: "boat", translation: "סירה", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "boat.jpg")), contentType: "jpg" } },
    { word: "bus", translation: "אוטובוס", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "bus.jpg")), contentType: "jpg" } },
    { word: "cable car", translation: "רכבלית", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "cablecar.jpg")), contentType: "jpg" } },
    { word: "car", translation: "רכב", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "car.jpg")), contentType: "jpg" } },
    { word: "helicopter", translation: "מסוק", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "helicopter.jpg")), contentType: "jpg" } },
    { word: "motorcycle", translation: "אופנוע", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "motorcycle.jpg")), contentType: "jpg" } },
    { word: "ship", translation: "אנייה", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "ship.jpg")), contentType: "jpg" } },
    { word: "train", translation: "רכבת", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "train.jpg")), contentType: "jpg" } },
    { word: "truck", translation: "משאית", categoryName: "vehicles", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "vehicles", "truck.jpg")), contentType: "jpg" } },

    //Fruits
    { word: "apple", translation: "תפוח", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "apple.jpg")), contentType: "jpg" } },
    { word: "apricot", translation: "משמש", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "apricot.jpg")), contentType: "jpg" } },
    { word: "banana", translation: "בננה", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "banana.jpg")), contentType: "jpg" } },
    { word: "cantaloupe", translation: "מילון", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "cantaloupe.jpg")), contentType: "jpg" } },
    { word: "cherry", translation: "דובדבן", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "cherry.jpg")), contentType: "jpg" } },
    { word: "grapes", translation: "ענבים", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "grapes.jpg")), contentType: "jpg" } },
    { word: "peach", translation: "אפרסק", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "peach.jpg")), contentType: "jpg" } },
    { word: "pear", translation: "אגס", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "pear.jpg")), contentType: "jpg" } },
    { word: "pineapple", translation: "אננס", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "pineapple.jpg")), contentType: "jpg" } },
    { word: "pomegranate", translation: "רימון", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "pomegranate.jpg")), contentType: "jpg" } },
    { word: "strawberry", translation: "תות", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "strawberry.jpg")), contentType: "jpg" } },
    { word: "watermelon", translation: "אבטיח", categoryName: "fruits", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "fruits", "watermelon.jpg")), contentType: "jpg" } },

    //numbers
    { word: "one", translation: "אחת", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "one.jpg")), contentType: "jpg" } },
    { word: "two", translation: "שתיים", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "two.jpg")), contentType: "jpg" } },
    { word: "three", translation: "שלוש", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "three.jpg")), contentType: "jpg" } },
    { word: "four", translation: "ארבע", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "four.jpg")), contentType: "jpg" } },
    { word: "five", translation: "חמש", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "five.jpg")), contentType: "jpg" } },
    { word: "six", translation: "שש", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "six.jpg")), contentType: "jpg" } },
    { word: "seven", translation: "שבע", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "seven.jpg")), contentType: "jpg" } },
    { word: "eight", translation: "שמונה", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "eight.jpg")), contentType: "jpg" } },
    { word: "nine", translation: "תשע", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "nine.jpg")), contentType: "jpg" } },
    { word: "ten", translation: "עשר", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "ten.jpg")), contentType: "jpg" } },
    { word: "twenty", translation: "עשרים", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "twenty.jpg")), contentType: "jpg" } },
    { word: "hundred", translation: "מאה", categoryName: "numbers", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "numbers", "hundred.jpg")), contentType: "jpg" } },

    //animals
    { word: "cat", translation: "חתול", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "cat.jpg")), contentType: "jpg" } },
    { word: "cow", translation: "פרה", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "cow.jpg")), contentType: "jpg" } },
    { word: "dog", translation: "כלב", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "dog.jpg")), contentType: "jpg" } },
    { word: "elephend", translation: "פיל", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "elephant.jpg")), contentType: "jpg" } },
    { word: "fish", translation: "דג", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "fish.jpg")), contentType: "jpg" } },
    { word: "horse", translation: "סוס", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "horse.jpg")), contentType: "jpg" } },
    { word: "lion", translation: "אריה", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "lion.jpg")), contentType: "jpg" } },
    { word: "monkey", translation: "קוף", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "monkey.jpg")), contentType: "jpg" } },
    { word: "sheep", translation: "כבשה", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "sheep.jpg")), contentType: "jpg" } },
    { word: "snake", translation: "נחש", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "snake.jpg")), contentType: "jpg" } },
    { word: "tiger", translation: "נמר", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "tiger.jpg")), contentType: "jpg" } },
    { word: "giraffe", translation: "גירפה", categoryName: "animals", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "animals", "giraffe.jpg")), contentType: "jpg" } },

    //furniture and Electrical
    { word: "air conditioner", translation: "מזגן", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "airConditioner.jpg")), contentType: "jpg" } },
    { word: "bed", translation: "מיטה", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "bed.jpg")), contentType: "jpg" } },
    { word: "chair", translation: "כיסא", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "chair.jpg")), contentType: "jpg" } },
    { word: "closet", translation: "ארון", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "closet.jpg")), contentType: "jpg" } },
    { word: "couch", translation: "ספה", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "couch.jpg")), contentType: "jpg" } },
    { word: "dresser", translation: "שידה", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "dresser.jpg")), contentType: "jpg" } },
    { word: "dryer", translation: "מיבש", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "dryer.jpg")), contentType: "jpg" } },
    { word: "freezer", translation: "מקפיא", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "freezer.jpg")), contentType: "jpg" } },
    { word: "oven", translation: "תנור", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "oven.jpg")), contentType: "jpg" } },
    { word: "refrigerator", translation: "מקרר", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "refrigerator.jpg")), contentType: "jpg" } },
    { word: "table", translation: "שולחן", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "table.jpg")), contentType: "jpg" } },
    { word: "wash machine", translation: "מכונת כביסה", categoryName: "furniture & Electrical", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "furnitureAndElectrical", "washingMachine.jpg")), contentType: "jpg" } },

    //colors
    { word: "black", translation: "שחור", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "black.jpg")), contentType: "jpg" } },
    { word: "blue", translation: "כחול", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "blue.jpg")), contentType: "jpg" } },
    { word: "brown", translation: "חום", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "brown.jpg")), contentType: "jpg" } },
    { word: "gray", translation: "אפור", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "gray.jpg")), contentType: "jpg" } },
    { word: "green", translation: "ירוק", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "green.jpg")), contentType: "jpg" } },
    { word: "light blue", translation: "תכלת", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "lightblue.jpg")), contentType: "jpg" } },
    { word: "orange", translation: "כתום", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "orange.jpg")), contentType: "jpg" } },
    { word: "pink", translation: "ורוד", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "pink.jpg")), contentType: "jpg" } },
    { word: "purple", translation: "סגול", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "purple.jpg")), contentType: "jpg" } },
    { word: "red", translation: "אדום", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "red.jpg")), contentType: "jpg" } },
    { word: "white", translation: "לבן", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "white.jpg")), contentType: "jpg" } },
    { word: "yellow", translation: "צהוב", categoryName: "colors", img: { data: fs.readFileSync(path.join(__dirname, "..", "images", "colors", "yellow.jpg")), contentType: "jpg" } },
]

//create questions
const createQuestions = async () => {
    const questions = []
    //loop that creates a question in every round for another category
    for (let i = 0; i < categoryList.length; i++) {
        const newQuestion = await createQuestionsAcordingToCategory(categoryList[i])
        questions.push(...newQuestion)
    }
    return questions
}

//create challenges
const createChallenges = async () => {
    const challenges = []
    //find all questions that the word is in category:)
    for (let i = 0; i < categoryList.length; i++) {
        const questionsFromDB = await Question.find().populate({
            path: 'question',
            match: { categoryName: categoryList[i] }
        }).lean()

        const filteredQuestions = questionsFromDB.filter((q) => { return q.question !== null })
        const newChallenge = { questions: filteredQuestions }
        challenges.push({ ...newChallenge })
    }
    return challenges
}

//create categories
const createCategories = async () => {
    const challengesFromDB = await Challenge.find({}, { questions: 1 }).lean()
    const categories = []

    //loop that adds a category  in every round
    for (let i = 0; i < categoryList.length; i++) {
        const foundChallenge = challengesFromDB.find(async (challenge) => {
            const foundQuestion = await Question.findById(challenge.questions[0]).lean()
            const foundWord = await Word.findById(foundQuestion.question).lean()
            return foundWord.categoryName === categoryList[i]
        })

        //create object category
        const newCategory = { name: categoryList[i], challenge: foundChallenge, level: "Easy" }
        categories.push({ ...newCategory })
    }
    return categories
}

//courses
const createCourses = async () => {
    //find all the categories
    const easyCategoriesFromDB = await Category.find({ level: "Easy" }).lean()
    const mediumCategoriesFromDB = await Category.find({ level: "Medium" }).lean()
    const hardCategoriesFromDB = await Category.find({ level: "Hard" }).lean()

    const courses = [
        { level: "Easy", categories: easyCategoriesFromDB },
        { level: "Medium", categories: mediumCategoriesFromDB },
        { level: "Hard", categories: hardCategoriesFromDB }
    ]
    return courses
}


module.exports = { words, createQuestions, createChallenges, createCategories, createCourses }
