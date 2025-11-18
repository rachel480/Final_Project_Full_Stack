const Category = require('../models/Category')
const FavoriteWord = require('../models/FavoriteWord')
const { Word } = require("../models/Word");
const Challenge = require("../models/Challenge");
const Question = require("../models/Question");
const Course = require('../models/Course')
const multer = require('multer');
const { json } = require('express');

const storage = multer.memoryStorage()
const upload = multer({ storage })

//get all categories for admin and user
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean()
    if (!categories)
      return res.status(400).json({ message: "no categories found" })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

//get by id for admin and user
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params
    if (!id)
      return res.status(400).send('id is required')
    const foundCategory = await Category.findById(id).lean()
    if (!foundCategory)
      return res.status(400).json({ message: "no Category found" })
    res.json(foundCategory)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getFullCategoryById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id)
      return res.status(400).json({ message: "id is required" })

    const category = await Category.findById(id)
      .populate("words")
      .populate("course")
      .populate({
        path: "challenge",
        populate: {
          path: "questions",
          populate: { path: "question" }
        }
      })
      .lean()

    if (!category)
      return res.status(404).json({ message: "Category not found" })

    return res.json(category)
  } catch (err) {
    console.error("getFullCategoryById error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

// update category by admin
const updateCategory = async (req, res) => {
  try {
    const { id, name, course } = req.body

    //Validation
    if (!id || !name || !course)
      return res.status(400).json({ message: "All fields are required" })

    //Find existing category
    const foundCategory = await Category.findById(id).exec()
    if (!foundCategory)
      return res.status(404).json({ message: "Category not found" })

    const oldCourseId = foundCategory.course?.toString()
    const newCourseId = course.toString()

    //Update category fields
    foundCategory.name = name
    foundCategory.course = newCourseId

    //If course has changed
    if (oldCourseId !== newCourseId) {
      // 1. Remove category from old course
      if (oldCourseId) {
        await Course.findByIdAndUpdate(oldCourseId, {
          $pull: { categories: id },
        })
      }

      // 2. Add category to new course
      await Course.findByIdAndUpdate(newCourseId, {
        $addToSet: { categories: id },
      })
    }

    //Save updated category
    const updatedCategory = await foundCategory.save()
    if (!updatedCategory)
      return res
        .status(400)
        .json({ message: `Error occurred while updating category ${name}` })

    return res
      .status(200)
      .json({ message: `Category "${name}" was updated successfully` })
  } catch (err) {
    console.error("Error updating category:", err)
    res.status(500).json({ message: err.message })
  }
}

//delete only for admin
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) return res.status(400).json({ message: "Category ID is required" })

    // Step 1: Find the category
    const category = await Category.findById(id).exec()
    if (!category) return res.status(404).json({ message: "Category not found" })

    // Step 2: Delete all words that belong to this category
    await Word.deleteMany({ categoryName: category.name })

    // Step 3: Delete all questions and the challenge
    if (category.challenge) {
      const challenge = await Challenge.findById(category.challenge).exec()
      if (challenge) {
        await Question.deleteMany({ _id: { $in: challenge.questions } })
        await challenge.deleteOne()
      }
    }

    // Step 4: Remove this category from its course's "categories" array
    await Course.updateOne(
      { _id: category.course },
      { $pull: { categories: category._id } }
    )

    // Step 5: Delete the category itself
    await category.deleteOne()

    return res.status(200).json({
      message: `Category "${category.name}" and all its related data were deleted successfully.`,
    })
  } catch (err) {
    console.error("Delete category error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

//get category with challenge
const getChallengeOfCategory = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send("id is required")

    const category = await Category.findById(id).populate({
      path: "challenge",
      populate: {
        path: "questions",
        model: "Question",
        populate: [
          { path: "question", model: "Word" },
          { path: "correctAnswer", model: "Word" },
          { path: "options", model: "Word" },
        ],
      },
    })

    if (!category)
      return res.status(404).json({ message: "Category not found" })
    return res.json(category.challenge)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getWordsOfCategory = async (req, res) => {
  try {
    const { id } = req.params
    if (!id)
      return res.status(400).send("id is required")

    const user = req.user
    const category = await Category.findById(id).populate({ path: "words" })

    if (!category)
      return res.status(404).json({ message: "Category not found" })

    const favWords = await FavoriteWord.find({ user: user._id }, { word: 1 }).lean()
    const favWordIds = favWords.map(f => f.word.toString())

    const wordsWithFavorites = category.words.map((word) => ({
      ...word.toObject(),
      isFavorite: favWordIds.includes(word._id.toString())
    }))

    return res.json(wordsWithFavorites)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createFullCategorySimple = async (req, res) => {
  try {
    const categoryInfo = JSON.parse(req.body.categoryInfo)
    const questions = JSON.parse(req.body.questions)
    let words = JSON.parse(req.body.words)
    const courseId = req.body.courseId
    const uploadedImages = req.files

    if (!uploadedImages || uploadedImages.length === 0) {
      console.log("No images uploaded")
    }

    words = words.map((wordObj, index) => {
      const relevantImage = uploadedImages?.find(file => file.originalname.includes(wordObj.word))

      if (relevantImage) {
        wordObj.img = {
          data: relevantImage.buffer,
          contentType: relevantImage.mimetype
        };
      }
      return wordObj;
    });

    // step 1: add words to DB
    const createdWords = await Word.insertMany(words)

    // step 2: add questions to DB
    const questionsWithIds = questions.map(q => {

      const questionWord = createdWords.find(w => w.word === q.question)

      const optionsWords = q.options.map(opt => {
        const word = createdWords.find(w => w.word === opt)
        return word._id
      })

      return { question: questionWord._id, correctAnswer: questionWord._id, options: optionsWords }
    })

    const createdQuestions = await Question.insertMany(questionsWithIds)

    //step 3: add challenge to DB
    const questionsIds = createdQuestions.map((q) => q._id)
    const createdChallenge = await Challenge.create({ questions: questionsIds })

    //step 4: add category to DB
    const wordsIds = createdWords.map(w => w._id)
    const addCategoryData = { name: categoryInfo.name, course: courseId, challenge: createdChallenge._id, words: wordsIds }
    const createdCategory = await Category.create(addCategoryData)

    //step 5: update course categories
    const foundCourse = await Course.findById(courseId).exec()
    foundCourse.categories.push(createdCategory._id)
    foundCourse.save()

    res.status(201).json({ message: "created succsesfully" })
  }
  catch (err) {
    console.error("createFullCourseSimple error:", err)
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

module.exports = { getAllCategories, getSingleCategory, getFullCategoryById, createFullCategorySimple, upload, updateCategory, deleteCategory, getChallengeOfCategory, getWordsOfCategory }