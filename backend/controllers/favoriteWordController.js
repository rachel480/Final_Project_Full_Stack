const FavoriteWord = require('../models/FavoriteWord')

//get all favorite words for user
const getAllFavoriteWords = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        let sortBy = req.query.sortBy

        if (!sortBy || sortBy === 'none' || sortBy === 'sort by')
            sortBy = 'createdAt'

        const user = req.user
        const foundWords = await FavoriteWord.find({ user: user._id })
            .populate('word')
            .sort({ [sortBy]: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()

        if (!foundWords)
            return res.status(400).json({ message: "no Words found" })

        const totalPages = Math.ceil(await FavoriteWord.countDocuments({ user: user._id }) / limit)
        return res.json({ words: foundWords, totalPages })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//create / remove favorite word for user
const toggleFavoriteWord = async (req, res) => {
    try {
        const { word } = req.body
        if (!word)
            return res.status(400).send('word is required')

        const user = req.user
        const foundWord = await FavoriteWord.findOne({ user: user._id, word }).exec()

        if (foundWord) {
            //remove from favorites
            const deletedWord = await foundWord.deleteOne()
            if (!deletedWord)
                return res.status(400).json({ message: `error occurred while deleting favorite word ` })
            return res.json({ message: `word with id:${word} was removed successfully from favorite` })
        }

        //add to favorites
        const newWord = await FavoriteWord.create({ word, user: user._id })
        if (!newWord)
            return res.status(400).json({ message: `error occurred while creating the word` })

        return res.status(201).json({ message: `word created successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//delete favorite word for user
const deleteFavoriteWord = async (req, res) => {
    try {
        const { id } = req.body
        if (!id)
            return res.status(400).send('id is required')

        const foundWord = await FavoriteWord.findById(id).exec()
        if (!foundWord)
            return res.status(400).json({ message: "no word found" })

        const deletedWord = await foundWord.deleteOne()
        if (!deletedWord)
            return res.status(400).json({ message: `error occurred while deleting favorite word with id ${id}` })

        return res.status(201).json({ message: `favorite word with id ${id} was deleted successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//update favorite word rating 
const updateFavoriteWordRaiting = async (req, res) => {
    try {
        const { id, rateing } = req.body
        if (!id || rateing === undefined || rateing === null)
            return res.status(400).send('id and rateing are required')

        if (rateing < 0 || rateing > 5)
            return res.status(400).send('rateing must be between 0 to 5')

        const foundWord = await FavoriteWord.findById(id).exec()
        if (!foundWord)
            return res.status(400).json({ message: "no word found" })

        foundWord.rateing = rateing

        const updatedWord = await foundWord.save()
        if (!updatedWord)
            return res.status(400).json({ message: `error occurred while updating favorite word rateing` })

        return res.status(201).json({ message: `favorite word rateing was updated successfully` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {getAllFavoriteWords,toggleFavoriteWord,deleteFavoriteWord,updateFavoriteWordRaiting}
