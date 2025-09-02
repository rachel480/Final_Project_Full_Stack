
const MyWord = require('../models/MyWord')
const MyCategory = require('../models/MyCategory')

//get all my words for user
const getAllMyWords = async (req, res) => {
    const user = req.user
    const foundWords = await MyWord.find({ user: user._id }).lean()

    if (!foundWords )
        return res.status(400).json({ message: "no Words found" })

    return res.json(foundWords)
}

//create my word for user
const createMyWord = async (req, res) => {
    const { word, rateing } = req.body

    //validation
    //required fields
    if (!word)
        return res.status(400).send('word is required')

    const user = req.user
    const newWord = await MyWord.create({ word, user: user._id, rateing })
    if (!newWord)
        return res.status(400).json({ message: `error occurred while creating the word` })

    //add the word to the category array
    const foundCategory = await MyCategory.findOne({ user: user._id, name: newWord.word.categoryName })
    if (!foundCategory)
        return res.status(404).json({ message: "Category not found" })
    foundCategory.words = [...foundCategory.words, newWord._id]
    
    const updatedCategory = await foundCategory.save()
    
    if (!updatedCategory)
        return res.status(400).json({ message: `error occurred while creating the word` })
    return res.status(201).json({ message: `word created successfully` })
}

//delete my word for user
const deleteMyWord = async (req, res) => {
    const { id } = req.body

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundWord = await MyWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    const deletedWord = await foundWord.deleteOne()
    if (!deletedWord)
        return res.status(400).json({ message: `error occurred while deleting word with id ${id}` })
    return res.status(201).json({ message: ` word with id ${id} was deleted successfully` })
}

//update my word raiting 
const updateMyWordRaiting = async (req, res) => {
    const { id } = req.body
    const rateing=Number(req.body.rateing)

    //validation
    //required fields
    if (!id || rateing === undefined || rateing === null)
        return res.status(400).send('id and rateing are required')

    //if rateing is valid
    if (rateing < 0 || rateing > 5)
        return res.status(400).send(' rateing must be between 0 to 5')


    const foundWord = await MyWord.findById(id).exec()
    if (!foundWord)
        return res.status(408).json({ message: "no word found" })

    //update fields
    foundWord.rateing = rateing

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating  word rateing` })
    return res.status(201).json({ message: ` word ratenig was updated successfully` })
}

//update my word raiting 
const updateMyWord = async (req, res) => {
    const { id, rateing, word } = req.body

    //validation
    //required fields
    if (!id || !rateing === undefined || rateing === null || !word)
        return res.status(400).send('id  word and rateing are required')

    //if rateing is valid
    if (rateing < 0 || rateing > 5)
        return res.status(400).send(' rateing must be between 0 to 5')


    const foundWord = await MyWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    //update fields
    foundWord.rateing = rateing
    foundWord.word = word

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating  word ` })
    return res.status(201).json({ message: ` word  was updated successfully` })
}

module.exports = { getAllMyWords, createMyWord, deleteMyWord, updateMyWordRaiting, updateMyWord }