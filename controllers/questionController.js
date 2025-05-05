const Question = require('../models/Question')
//get all Question for admin and user
const getAllQuestion = async (req, res) => {
    const question = await Question.find().lean()
    if (!question)
        return res.status(400).json({ message: 'no question found' })
    res.json(question)
}
//get Question by id for admin and user
const getSingleQuestion = async (req, res) => {
    const { id } = req.params
    //validetion
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundQuestion = await Question.findById(id).lean()
    if (!foundQuestion)
        return res.status(400).json({ message: 'no question found' })
    res.json(foundQuestion)

}
//create new Question for admin
const createNewQuestion = async (req, res) => {
    const { question, userAnswer, correctAnswer, grade, options } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!question || !correctAnswer || !options)
        return res.status(400).send('all fields are required')

    const newQuestion = await Question.create({ question, userAnswer, correctAnswer, grade, options })
    if (!newQuestion)
        return res.status(400).json({ message: `error occurred while createing  the question ` })
    return res.status(201).json({ message: `question created successfully` })

}
//update Question for admin
const updateQuestion = async (req, res) => {
    const { question, userAnswer, correctAnswer, grade, options, id } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!question|| !correctAnswer || !options || !id)
        return res.status(400).send('all fields are required')
    const foundQuestion = await Question.findById(id).exec()
    if (!foundQuestion)
        return res.status(400).json({ message: 'no questions found' })
    //update fields
    foundQuestion.question = question
    foundQuestion.userAnswer = userAnswer?userAnswer:foundQuestion.userAnswer
    foundQuestion.correctAnswer = correctAnswer
    foundQuestion.grade = grade?grade:foundQuestion.grade
    foundQuestion.options = options
    const updatedQuestion = await foundQuestion.save()
    if (!updatedQuestion)
        return res.status(400).json({ message: `error occurred while updateing question` })
    return res.status(201).json({ message: `question updated successfully` })
}
//delate Question for admin
const delateQuestion = async (req, res) => {
    const { id } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundQuestion = await Question.findById(id).exec()
    if (!foundQuestion)
        return res.status(400).json({ message: 'no questions found' })
    const deletedQuestion =await foundQuestion.deleteOne()
    if (!deletedQuestion)
        return res.status(400).json({ message: `error occurred while deleting question ${id}` })
    return res.status(201).json({ message: `question with id ${id} was deletd successfully` })

}
module.exports = { getAllQuestion, getSingleQuestion, createNewQuestion, updateQuestion, delateQuestion }