const { Word } = require('../models/Word')
const Category= require('../models/Category')

//get all words for admin and user
const getAllWords = async (req, res) => {
  try {
    const words = await Word.find({}, { img: 0 }).lean()
    if (!words || words.length === 0)
      return res.status(400).json({ message: "no words found" })
    res.json(words)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//get word by id for admin and user
const getSingleWord = async (req, res) => {
  try {
    const { id } = req.params
    if (!id)
      return res.status(400).send('id is required')

    const foundWord = await Word.findById(id).lean()
    if (!foundWord)
      return res.status(400).json({ message: "no Word found" })
    res.json(foundWord)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//create word only for admin
const createNewWord = async (req, res) => {
  try {
    const { word, translation, categoryName ,categoryId} = req.body

    //validation:
    if (!word || !translation || !categoryName || !categoryId)
      return res.status(400).send('all fields are required')

    const newWord = await Word.create({ word, translation, categoryName })
    if (!newWord)
      return res.status(400).json({ message: `error occurred while creating word ${word}` })

    //add the word to category array
    const category = await Category.findById(categoryId).exec()
    //update category
    category.words.push(newWord._id)
    await category.save()

    return res.status(201).json({ message: `word ${word} was created successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//update word only for admin
const updateWord = async (req, res) => {
  try {
    const { id, word, translation, categoryName } = req.body

    //validation
    if (!word || !translation || !id || !categoryName)
      return res.status(400).send('all fields are required')

    const foundWord = await Word.findById(id).exec()
    if (!foundWord)
      return res.status(400).json({ message: "no word found" })

    foundWord.word = word
    foundWord.translation = translation
    foundWord.categoryName = categoryName

    const updatedWord = await foundWord.save()
    if (!updatedWord)
      return res.status(400).json({ message: `error occurred while updating word ${word}` })
    return res.status(201).json({ message: `word ${word} was updated successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete word only for admin
const deleteWord = async (req, res) => {
  try {
    const { id } = req.body

    //validation
    if (!id)
      return res.status(400).send('id is required')

    const foundWord = await Word.findById(id).exec()
    if (!foundWord)
      return res.status(400).json({ message: "no word found" })

    const deletedWord = await foundWord.deleteOne()
    if (!deletedWord)
      return res.status(400).json({ message: `error occurred while deleting word with id ${id}` })
    return res.status(201).json({ message: `word with id ${id} was deleted successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getWordsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params
    if (!categoryName)
      return res.status(400).json({ message: 'category name is required' })

    const words = await Word.find({ categoryName }).lean()
    if (!words || words.length === 0)
      return res.status(400).json({ message: `no words found in category ${categoryName}` })
    res.json(words)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllWords, getSingleWord, createNewWord, updateWord, deleteWord, getWordsByCategory }