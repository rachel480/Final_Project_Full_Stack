const Category = require('../models/Category')
const FavoriteWord = require('../models/FavoriteWord')

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

//create only for admin
const createCategory = async (req, res) => {
    try {
        const { name, challenge, course } = req.body

        //validation
        if (!name || !course || !challenge)
            return res.status(400).send('all fields are required')

        const newCategory = await Category.create({ name, course, challenge })
        if (!newCategory)
            return res.status(400).json({ message: `error occurred while creating category ${name}` })
        return res.status(201).json({ message: `category ${name} was created successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


//update only for admin
const updateCategory = async (req, res) => {
    try {
        const { id, name, challenge,  course } = req.body

        //validation
        if (!name || !challenge || !id || !course)
            return res.status(400).send('all fields are required')

        const foundCategory = await Category.findById(id).exec()
        if (!foundCategory)
            return res.status(400).json({ message: "no Category found" })

        foundCategory.name = name
        foundCategory.course = course
        foundCategory.challenge = challenge

        const updatedCategory = await foundCategory.save()
        if (!updatedCategory)
            return res.status(400).json({ message: `error occurred while updating category ${name}` })
        return res.status(201).json({ message: `category ${name} was updated successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//delete only for admin
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body

        //validation
        if (!id)
            return res.status(400).send('id is required')

        const foundCategory = await Category.findById(id).exec()
        if (!foundCategory)
            return res.status(400).json({ message: "no Category found" })

        const deletedCategory = await foundCategory.deleteOne()
        if (!deletedCategory)
            return res.status(400).json({ message: `error occurred while deleting category with id ${id}` })
        return res.status(201).json({ message: `category with id ${id} was deleted successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
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

module.exports = { getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory, getChallengeOfCategory, getWordsOfCategory }
