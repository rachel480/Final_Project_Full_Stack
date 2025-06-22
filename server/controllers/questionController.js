const Question = require('../models/Question')


//get all Questions for admin and user
const getAllQuestions = async (req, res) => {
    const questions = await Question.find().lean()
    if (!questions)
        return res.status(400).json({ message: "no question found" })
    res.json(questions)
}

//get question by id for admin and user
const getSingleQuestion = async (req, res) => {
    const { id } = req.params

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundQuestion = await Question.findById(id).lean()
    if (!foundQuestion)
        return res.status(400).json({ message: "no Question found" })
    return res.json(foundQuestion)
}

//create new question for admin
const createNewQuestion = async (req, res) => {
    const { question, correctAnswer,options } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!question || !correctAnswer || !options)
        return res.status(400).send('all fields are required')


    const newQuestion = await Question.create({ question,correctAnswer,options })
    if (!newQuestion)
        return res.status(400).json({ message: `error occurred while creating the question` })
    return res.status(201).json({ message: `Question created successfully` })
}

//update question for admin
const updateQuestion = async (req, res) => {
    const { question, correctAnswer, options, id } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!question || !correctAnswer || !options || !id)
        return res.status(400).send('all fields are required')


    const foundQuestion = await Question.findById(id).exec()
    if (!foundQuestion)
        return res.status(400).json({ message: "no question found" })

    //update fields
    foundQuestion.question = question
    foundQuestion.correctAnswer = correctAnswer
    foundQuestion.options = options

    const updatedQuestion = await foundQuestion.save()
    if (!updatedQuestion)
        return res.status(400).json({ message: `error occurred while updating question` })
    return res.status(201).json({ message: `question was updated successfully` })
}

//delete course for admin
const deleteQuestion = async (req, res) => {
    const { id } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundQuestion = await Question.findById(id).exec()
    if (!foundQuestion)
        return res.status(400).json({ message: "no question found" })

    const deletedQuestion = await foundQuestion.deleteOne()
    if (!deletedQuestion)
        return res.status(400).json({ message: `error occurred while deleting question with id ${id}` })
    return res.status(201).json({ message: `question with id ${id} was deleted successfully` })
}

module.exports = { getAllQuestions, getSingleQuestion, createNewQuestion, updateQuestion, deleteQuestion }