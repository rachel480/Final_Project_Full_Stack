const Challenge = require('../models/Challenge')
const UserProgress = require('../models/UserProgress')
const Question = require("../models/Question")
const Category = require("../models/Category")

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

const getFullChallengeById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "id is required" })
    }

    const challenge = await Challenge.findById(id)
      .populate({
        path: "questions",
        populate: [
          { path: "question", model: "Word" },
        ]
      })
      .lean()

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" })
    }

    return res.json(challenge)
  } catch (err) {
    console.error("getFullChallengeById error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

//update challenge for admin
const updateChallenge = async (req, res) => {
    try {
        const { questions, id } = req.body

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
    if (!id) return res.status(400).json({ message: "Challenge ID is required" })

    // Step 1: Find the challenge
    const challenge = await Challenge.findById(id).exec()
    if (!challenge) return res.status(404).json({ message: "Challenge not found" })

    // Step 2: Delete all questions associated with this challenge
    if (challenge.questions && challenge.questions.length > 0) {
      await Question.deleteMany({ _id: { $in: challenge.questions } })
    }

    // Step 3: Remove the challenge reference from any category
    await Category.updateMany(
      { challenge: id },
      { $unset: { challenge: "" } }
    )

    // Step 4: Delete the challenge itself
    await challenge.deleteOne()

    return res.status(200).json({
      message: `Challenge with ID "${id}" and all its questions were deleted successfully.`,
    })
  } catch (err) {
    console.error("Delete challenge error:", err)
    return res.status(500).json({ message: "Internal server error" })
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

        const results = foundChallenge.questions.map((question) => {
            const userAnswer = challengeResult?.answers.find(
                (answer) => answer.question.toString() === question._id.toString()
            ) || null
            return {
                ...question.toObject(),
                userAnswer,
                status: userAnswer?.questionStatus
            }
        })

        res.json({ totalScore: challengeResult?.totalScore, questions: results })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// create a challenge
const createFullChallenge = async (req, res) => {
  try {
    const { questions, categoryId } = req.body

    // step 1: add questions to DB
    const createdQuestions = await Question.insertMany(questions)

    // step 2: create challenge with question ids
    const questionIds = createdQuestions.map((q) => q._id)
    const createdChallenge = await Challenge.create({
      questions: questionIds,
    })

    // step 3: attach challenge to category
    const foundCategory = await Category.findById(categoryId).exec()
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" })
    }

    foundCategory.challenge = createdChallenge._id
    await foundCategory.save()

    res.status(201).json({ message: "Challenge created successfully" })
  } catch (err) {
    console.error("createFullChallenge error:", err)
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

module.exports = { getAllChallenges, getSingleChallenge,getFullChallengeById,createFullChallenge, updateChallenge, deleteChallenge, getChallengeResults }