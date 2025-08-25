const FavoriteWord = require('../models/FavoriteWord')

//get all favorite words for user
const getAllFavoriteWords = async (req, res) => {
    const user = req.user
    const foundWords = await FavoriteWord.find({ user: user._id }).populate('Word').lean()
    if (!foundWords)
        return res.status(400).json({ message: "no Words found" })
    return res.json(foundWords)
}

//get single favorite word for user
const getSingleFavoriteWord = async (req, res) => {
    const { id } = req.params

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const user = req.user

    const foundWord = await FavoriteWord.findOne({ user: user._id, _id: id }).populate('Word').lean()
    if (!foundWord)
        return res.status(400).json({ message: "no Word found" })
    return res.json(foundWord)
}

//create favorite word for user
const createFavoriteWord = async (req, res) => {
    const { word } = req.body

    //validation
    //required fields
    if (!word)
        return res.status(400).send('word is required')

    const user = req.user

    const newWord = await FavoriteWord.create({ word, user })
    if (!newWord)
        return res.status(400).json({ message: `error occurred while creating the word` })
    return res.status(201).json({ message: `word created successfully` })
}
//delete favorite word for user
const deleteFavoriteWord = async (req, res) => {
    const { id } = req.body

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundWord = await FavoriteWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    const deletedWord = await foundWord.deleteOne()
    if (!deletedWord)
        return res.status(400).json({ message: `error occurred while deleting favorite word with id ${id}` })
    return res.status(201).json({ message: `favorite word with id ${id} was deleted successfully` })
}

//update favorite word raiting 
const updateFavoriteWordRaiting = async (req, res) => {
    const { id, rateing} = req.body

    //validation
    //required fields
    if (!id || !rateing)
        return res.status(400).send('id and rateing are required')

    const foundWord = await FavoriteWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    //update fields
    foundWord.rateing=rateing

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating favorite word rateing` })
    return res.status(201).json({ message: `favorite word ratenig was updated successfully` })
}

module.exports = { getAllFavoriteWords, getSingleFavoriteWord, createFavoriteWord, deleteFavoriteWord ,updateFavoriteWordRaiting}