const Word = require('../models/Word')

//get all words for admin and user
const getAllWords = async (req, res) => {
    const words = await Word.find({},{img:0}).lean()
    if (!words)
        return res.status(400).json({ message: "no words found" })
    res.json(words)
}

//get word by id for admin and user
const getSingleWord = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')
    const foundWord = await Word.findById(id).lean()
    if (!foundWord)
        return res.status(400).json({ message: "no Word found" })
    res.json(foundWord)
}

//create word only for admin
const createNewWord = async (req, res) => {
    const { word, translation,categoryName,} = req.body

    //validation:
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!word || !translation || !categoryName)
        return res.status(400).send('all fields are required')

    const newWord = await Word.create({ word, translation,categoryName})
    if (!newWord)
        return res.status(400).json({ message: `error occurred while creating word ${word}` })
    return res.status(201).json({ message: `word ${word} was created successfully` })
}

//update word only for admin
const updateWord = async (req, res) => {
    const { id, word, translation,categoryName} = req.body

    //validation:
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!word || !translation || !id ||!categoryName)
        return res.status(400).send('all fields are required')

    const foundWord = await Word.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    //update fields
    foundWord.word = word
    foundWord.translation = translation
    foundWord.categoryName=categoryName

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating word ${word}` })
    return res.status(201).json({ message: `word ${word} was updated successfully` })
}

//delete word only for admin
const deleteWord = async (req, res) => {
    const { id } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })
    
    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundWord = await Word.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    const deletedWord = await foundWord.deleteOne()
    if (!deletedWord)
        return res.status(400).json({ message: `error occurred while deleting word with id ${id}` })
    return res.status(201).json({ message: `word with id ${id} was deleted successfully` })
}

module.exports = { getAllWords, getSingleWord, createNewWord, updateWord, deleteWord }