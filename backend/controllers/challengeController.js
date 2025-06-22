const Challenge = require('../models/Challenge')

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
    const {questions} = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!questions)
        return res.status(400).send('questions are required')

    const newChallenge = await Challenge.create({ questions})
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

module.exports = { getAllChallenges, getSingleChallenge, createNewChallenge, updateChallenge, deleteChallenge }