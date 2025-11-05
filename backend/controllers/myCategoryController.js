const MyCategory = require('../models/MyCategory')
const MyWord = require('../models/MyWord')

//get all categories for user
const getAllCategories = async (req, res) => {
    try {
        const user = req.user
        const categories = await MyCategory.find({ user: user._id }).lean()
        if (!categories)
            return res.status(400).json({ message: "no categories found" })
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//create for user
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const user = req.user

        if (!name)
            return res.status(400).send('category name is required')

        const newCategory = await MyCategory.create({ name, user: user._id })
        if (!newCategory)
            return res.status(400).json({ message: `error occurred while creating category ${name}` })
        return res.status(201).json({ message: `category ${name} was created successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update for user
const updateCategory = async (req, res) => {
    try {
        const { id, name } = req.body
        const user = req.user

        if (!name || !id)
            return res.status(400).send('category name and id are required')

        const foundCategory = await MyCategory.findOne({ _id: id, user: user._id }).exec()
        if (!foundCategory)
            return res.status(400).json({ message: "no Category found" })

        foundCategory.name = name

        const updatedCategory = await foundCategory.save()

        await Promise.all(
            foundCategory.words.map(async (word) => {
                const foundWord = await MyWord.findById(word).exec()
                if (foundWord) {
                    foundWord.word.categoryName = updatedCategory.name
                    await foundWord.save()
                }
            })
        )

        if (!updatedCategory)
            return res.status(400).json({ message: `error occurred while updating category ${name}` })
        return res.status(201).json({ message: `category ${name} was updated successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete for user
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body
        const user = req.user

        if (!id)
            return res.status(400).send('id is required')

        const foundCategory = await MyCategory.findOne({ _id: id, user: user._id }).exec()
        if (!foundCategory)
            return res.status(400).json({ message: "no Category found" })

        await Promise.all(
            foundCategory.words.map(async (word) => {
                const foundWord = await MyWord.findById(word).exec()
                if (foundWord)
                    await foundWord.deleteOne()
            })
        )

        const deletedCategory = await foundCategory.deleteOne()
        if (!deletedCategory)
            return res.status(400).json({ message: `error occurred while deleting category with id ${id}` })
        return res.status(200).json({ message: `category with id ${id} was deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get words of category
const getWordsOfCategory = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res.status(400).send("id is required")

        const category = await MyCategory.findById(id).populate({ path: "words" })
        if (!category)
            return res.status(404).json({ message: "Category not found" })

        return res.json(category.words)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory, getWordsOfCategory }