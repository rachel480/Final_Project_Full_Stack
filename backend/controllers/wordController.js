const { Word } = require('../models/Word')
const Category = require('../models/Category')
const Challenge = require('../models/Challenge')
const Question = require('../models/Question')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })

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
    const { word, translation, categoryName, categoryId } = req.body

    //validation:
    if (!word || !translation || !categoryName || !categoryId)
      return res.status(400).send('all fields are required')

    //handle word img
    const img = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined

    const newWord = await Word.create({ word, translation, categoryName,img })
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

// Update word (admin only)
const updateWord = async (req, res) => {
  try {
    const { id, word, translation, categoryName } = req.body

    if (!id || !word || !translation || !categoryName)
      return res.status(400).json({ message: "All fields are required" })

    // Find word
    const foundWord = await Word.findById(id).exec()
    if (!foundWord)
      return res.status(404).json({ message: "Word not found" })

    const oldCategoryName = foundWord.categoryName
    const isCategoryChanged =
      oldCategoryName.toLowerCase() !== categoryName.toLowerCase()

    // If new image uploaded:
    if (req.file) {
      foundWord.img = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    }

    // Update text fields
    foundWord.word = word
    foundWord.translation = translation
    foundWord.categoryName = categoryName.toLowerCase()

    // Save word
    const updatedWord = await foundWord.save()

    if (isCategoryChanged) {
      const oldCategory = await Category.findOne({ name: oldCategoryName }).exec()
      const newCategory = await Category.findOne({ name: categoryName }).exec()

      if (!newCategory)
        return res.status(400).json({ message: `Category '${categoryName}' not found` })

      if (oldCategory) {
        oldCategory.words = oldCategory.words.filter(
          (wId) => wId.toString() !== foundWord._id.toString()
        )
        await oldCategory.save()
      }

      if (!newCategory.words.includes(foundWord._id)) {
        newCategory.words.push(foundWord._id)
        await newCategory.save()
      }
    }

    return res.status(200).json({
      message: `Word '${word}' was updated successfully`,
      word: updatedWord,
    })

  } catch (error) {
    console.error("Error updating word:", error)
    res.status(500).json({ message: error.message })
  }
}

//delete word only for admin
const deleteWord = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) return res.status(400).json({ message: "Word ID is required" })

    // Step 1: Find the word
    const word = await Word.findById(id).exec()
    if (!word) return res.status(404).json({ message: "Word not found" })

    // Step 2: Find the category this word belongs to
    const category = await Category.findOne({ name: word.categoryName }).exec()

    // Step 3: Remove the word from category.words array
    if (category) {
      category.words = category.words.filter(
        w => w.toString() !== word._id.toString()
      )
      await category.save()
    }

    // Step 4: Remove questions that reference this word
    if (category?.challenge) {
      const challenge = await Challenge.findById(category.challenge).exec()
      if (challenge) {
        // Find questions that have this word in correctAnswer or in options array
        const questionsToDelete = await Question.find({
          _id: { $in: challenge.questions },
          $or: [
            { correctAnswer: word._id },
            { options: word._id },
            { question: word._id }
          ]
        }).exec()

        // Delete these questions
        for (const q of questionsToDelete) {
          // Remove from challenge.questions array
          challenge.questions = challenge.questions.filter(
            id => id.toString() !== q._id.toString()
          )
          await q.deleteOne()
        }

        await challenge.save()
      }
    }

    // Step 5: Delete the word itself
    await word.deleteOne()

    return res.status(200).json({ message: `Word "${word.word}" deleted successfully.` })
  } catch (err) {
    console.error("Delete word error:", err)
    return res.status(500).json({ message: "Internal server error" })
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

module.exports = { getAllWords, getSingleWord, createNewWord, upload ,updateWord, deleteWord, getWordsByCategory }