const Category = require('../models/Category')
const FavoriteWord=require('../models/FavoriteWord')

//get all categories for admin and user
const getAllCategories = async (req, res) => {
    const categories = await Category.find().lean()
    if (!categories)
        return res.status(400).json({ message: "no categories found" })
    res.json(categories)
}

//get by id for admin and user
const getSingleCategory = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')
    const foundCategory = await Category.findById(id).lean()
    if (!foundCategory)
        return res.status(400).json({ message: "no Category found" })
    res.json(foundCategory)
}

//create only for admin
const createCategory = async (req, res) => {
    const { name, challenge, level } = req.body

    //validation:
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!name || !level || !challenge)
        return res.status(400).send('all fields are required')

    const newCategory = await Category.create({ name, level, challenge })
    if (!newCategory)
        return res.status(400).json({ message: `error occurred while creating category ${name}` })
    return res.status(201).json({ message: `category ${name} was created successfully` })
}

//update only for admin
const updateCategory = async (req, res) => {
    const { id, name, challenge, level } = req.body

    //validation:
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!name || !challenge || !id || !level)
        return res.status(400).send('all fields are required')

    const foundCategory = await Category.findById(id).exec()
    if (!foundCategory)
        return res.status(400).json({ message: "no Category found" })

    //update fields
    foundCategory.name = name
    foundCategory.level = level
    foundCategory.challenge = challenge

    const updatedCategory = await foundCategory.save()
    if (!updatedCategory)
        return res.status(400).json({ message: `error occurred while updating category ${name}` })
    return res.status(201).json({ message: `category ${name} was updated successfully` })
}

//delete only for admin
const deleteCategory = async (req, res) => {
    const { id } = req.body

    //validation
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundCategory = await Category.findById(id).exec()
    if (!foundCategory)
        return res.status(400).json({ message: "no Category found" })

    const deletedCategory = await foundCategory.deleteOne()
    if (!deletedCategory)
        return res.status(400).json({ message: `error occurred while deleting category with id ${id}` })
    return res.status(201).json({ message: `category with id ${id} was deleted successfully` })
}
    //get category with challenge
    const getChallengeOfCategory = async (req, res) => {
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
    }

const getWordsOfCategory = async (req, res) => {
    const { id } = req.params

    if (!id) 
        return res.status(400).send("id is required");
    const user=req.user
    const category = await Category.findById(id).populate({path: "words"})

    if (!category)
        return res.status(404).json({ message: "Category not found" });
    //get all favorite words
        const favWords = await FavoriteWord.find({user:user._id},{word:1}).lean()
        const favWordIds = favWords.map(f => f.word.toString());
    
        const wordsWithFavorites= category.words.map((word)=>({
            ...word.toObject(),
            isFavorite:favWordIds.includes(word._id.toString())
        }))
    return res.json(wordsWithFavorites)
}

module.exports = { getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory,getChallengeOfCategory,getWordsOfCategory}