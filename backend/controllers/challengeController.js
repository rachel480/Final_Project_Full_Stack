const Challenge = require('../models/Challenge')
const UserProgress = require('../models/UserProgress')

//get all challenges for admin and user
const getAllChallenges = async (req, res) => {
    const challenges = await Challenge.find().lean()
    if (!challenges)
        return res.status(400).json({ message: "no challenges found" })
    res.json(challenges)
}

//get challenge by id for admin and user
const getSingleChallenge = async (req, res) => {
    const { id } = req.params

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundChallenge = await Challenge.findById(id).lean()
    if (!foundChallenge)
        return res.status(400).json({ message: "no challenge found found" })
    return res.json(foundChallenge)
}

//create new challenge for admin
const createNewChallenge = async (req, res) => {
    const { questions } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!questions)
        return res.status(400).send('questions are required')

    const newChallenge = await Challenge.create({ questions })
    if (!newChallenge)
        return res.status(400).json({ message: `error occurred while creating the challenge` })
    return res.status(201).json({ message: `challenge created successfully` })
}

//update challenge for admin
const updateChallenge = async (req, res) => {
    const { questions, id } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!questions || !id)
        return res.status(400).send('questions and id are required')

    const foundChallenge = await Challenge.findById(id).exec()
    if (!foundChallenge)
        return res.status(400).json({ message: "no challenge found" })

    //update fields
    foundChallenge.questions = questions

    const updatedChallenge = await foundChallenge.save()
    if (!updatedChallenge)
        return res.status(400).json({ message: `error occurred while updating challenge` })
    return res.status(201).json({ message: `challenge was updated successfully` })
}

//delete challenge for admin
const deleteChallenge = async (req, res) => {
    const { id } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundChallenge = await Challenge.findById(id).exec()
    if (!foundChallenge)
        return res.status(400).json({ message: "no challenge found" })

    const deletedChallenge = await foundChallenge.deleteOne()
    if (!deletedChallenge)
        return res.status(400).json({ message: `error occurred while deleting challenge with id ${id}` })
    return res.status(201).json({ message: `challenge with id ${id} was deleted successfully` })

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
                { path: 'options'}
            ]
        })
        if (!foundChallenge)
            return res.status(404).json({ message: "Challenge not found" })

        //find user progress
        const foundUserProgress = await UserProgress.findOne({ user: user._id })
        if (!foundUserProgress)
            return res.status(404).json({ message: "User progress not found" })

        //find the challenge result
        const challengeResult = foundUserProgress.challengeResults.find(
            (result) => result.challenge.toString() === id
        )

        const results = foundChallenge.questions.map((questio) => {
            const userAnswer = challengeResult?.answers.find((answer) => answer.question.toString() === questio._id.toString()) || null
            return {
                ...questio.toObject(),
                userAnswer,
                status:userAnswer.questionstatus
            }
        })

        res.json({ totalScore: challengeResult?.totalScore, questions: results })

    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

module.exports = { getAllChallenges, getSingleChallenge, createNewChallenge, updateChallenge, deleteChallenge, getChallengeResults }