const Question = require('../models/Question')
const Challenge = require('../models/Challenge')

//get all Questions for admin and user
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().lean()
        if (!questions)
            return res.status(400).json({ message: "no question found" })
        res.json(questions)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

//get question by id for admin and user
const getSingleQuestion = async (req, res) => {
    try {
        const { id } = req.params
        if (!id)
            return res.status(400).send('id is required')

        const foundQuestion = await Question.findById(id).lean()
        if (!foundQuestion)
            return res.status(400).json({ message: "no Question found" })
        return res.json(foundQuestion)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getFullQuestionById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const question = await Question.findById(id)
            .populate({ path: "question", model: "Word" })        
            .populate({ path: "correctAnswer", model: "Word" })   
            .populate({ path: "options", model: "Word" })   
            .lean()

        if (!question) {
            return res.status(404).json({ message: "Question not found" })
        }

        return res.json(question)
    } catch (err) {
        console.error("getFullQuestionById error:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

//create new question for admin
const createNewQuestion = async (req, res) => {
    try {
        const { question, correctAnswer, options ,challengeId} = req.body

        //validation
        if (!question || !correctAnswer || !options || !challengeId)
            return res.status(400).send('all fields are required')

        const newQuestion = await Question.create({ question, correctAnswer, options })
        if (!newQuestion)
            return res.status(400).json({ message: `error occurred while creating the question` })

        //update challenge
        const challenge = await Challenge.findById(challengeId).exec()
        challenge.questions.push(newQuestion._id)
        await challenge .save()

        return res.status(201).json({ message: `Question created successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

//update question for admin
const updateQuestion = async (req, res) => {
    try {
        const { question, correctAnswer, options, id } = req.body

        //validation
        if (!question || !correctAnswer || !options || !id)
            return res.status(400).send('all fields are required')

        const foundQuestion = await Question.findById(id).exec()
        if (!foundQuestion)
            return res.status(400).json({ message: "no question found" })

        foundQuestion.question = question
        foundQuestion.correctAnswer = correctAnswer
        foundQuestion.options = options

        const updatedQuestion = await foundQuestion.save()
        if (!updatedQuestion)
            return res.status(400).json({ message: `error occurred while updating question` })
        return res.status(201).json({ message: `question was updated successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

//delete question for admin
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) return res.status(400).json({ message: "Question ID is required" })

    // Step 1: Find the question
    const question = await Question.findById(id).exec()
    if (!question) return res.status(404).json({ message: "Question not found" })

    // Step 2: Find the challenge that contains this question
    const challenge = await Challenge.findOne({ questions: question._id }).exec()

    // Step 3: Remove the question ID from the challenge.questions array
    if (challenge) {
      challenge.questions = challenge.questions.filter(
        qId => qId.toString() !== question._id.toString()
      )
      await challenge.save()
    }

    // Step 4: Delete the question itself
    await question.deleteOne()

    return res.status(200).json({ message: `Question "${question.question}" deleted successfully.` })
  } catch (err) {
    console.error("Delete question error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = { getAllQuestions, getSingleQuestion,getFullQuestionById, createNewQuestion, updateQuestion, deleteQuestion }