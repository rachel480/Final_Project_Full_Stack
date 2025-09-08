const Challenge = require('../models/Challenge')
const UserProgress = require('../models/UserProgress')
const Question=require('./questionController')

//get all challenges for admin and user
const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find().lean()
        if (!challenges)
            return res.status(400).json({ message: "no challenges found" })
        res.json(challenges)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//get challenge by id for admin and user
const getSingleChallenge = async (req, res) => {
    try {
        const { id } = req.params
        //validation
        if (!id)
            return res.status(400).send('id is required')

        const foundChallenge = await Challenge.findById(id).lean()
        if (!foundChallenge)
            return res.status(400).json({ message: "no challenge found found" })

        return res.json(foundChallenge)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//create new challenge for admin
const createNewChallenge = async (req, res) => {
    try {
        const { questions } = req.body

        //validation
        if (!questions)
            return res.status(400).send('questions are required')

        const newChallenge = await Challenge.create({ questions })
        if (!newChallenge)
            return res.status(400).json({ message: `error occurred while creating the challenge` })

        return res.status(201).json({ message: `challenge created successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//update challenge for admin
const updateChallenge = async (req, res) => {
    try {
        const { questions, id } = req.body

        //validation
        if (!questions || !id)
            return res.status(400).send('questions and id are required')

        const foundChallenge = await Challenge.findById(id).exec()
        if (!foundChallenge)
            return res.status(400).json({ message: "no challenge found" })

        foundChallenge.questions = questions

        const updatedChallenge = await foundChallenge.save()
        if (!updatedChallenge)
            return res.status(400).json({ message: `error occurred while updating challenge` })

        return res.status(201).json({ message: `challenge was updated successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//delete challenge for admin
const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.body

        //validation
        if (!id)
            return res.status(400).send('id is required')

        const foundChallenge = await Challenge.findById(id).exec()
        if (!foundChallenge)
            return res.status(400).json({ message: "no challenge found" })
        //delete the questions
        await Promise.all(
            foundChallenge.words.map(async (qustion) => {
                const foundQuestion = await Question.findById(qustion).exec()
                if (foundQuestion)
                    await foundQuestion.deleteOne()
            })
        )
        const deletedChallenge = await foundChallenge.deleteOne()
        if (!deletedChallenge)
            return res.status(400).json({ message: `error occurred while deleting challenge with id ${id}` })

        return res.status(201).json({ message: `challenge with id ${id} was deleted successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//get challenge results
const getChallengeResults = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.user

        const foundChallenge = await Challenge.findById(id).populate({
            path: 'questions',
            populate: [
                { path: 'question' },
                { path: 'correctAnswer' },
                { path: 'options' }
            ]
        })
        if (!foundChallenge)
            return res.status(404).json({ message: "Challenge not found" })

        const foundUserProgress = await UserProgress.findOne({ user: user._id })
        if (!foundUserProgress)
            return res.status(404).json({ message: "User progress not found" })

        const challengeResult = foundUserProgress.challengeResults.find(
            (result) => result.challenge.toString() === id
        )

        const results = foundChallenge.questions.map((questio) => {
            const userAnswer = challengeResult?.answers.find(
                (answer) => answer.question.toString() === questio._id.toString()
            ) || null
            return {
                ...questio.toObject(),
                userAnswer,
                status: userAnswer?.questionstatus
            }
        })

        res.json({ totalScore: challengeResult?.totalScore, questions: results })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAllChallenges, getSingleChallenge, createNewChallenge, updateChallenge, deleteChallenge, getChallengeResults }
