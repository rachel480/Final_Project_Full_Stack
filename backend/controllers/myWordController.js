const MyWord = require('../models/MyWord')
const MyCategory = require('../models/MyCategory')

// get all my words for user
const getAllMyWords = async (req, res) => {
    try {
        const user = req.user
        const foundWords = await MyWord.find({ user: user._id }).lean()
        if (!foundWords)
            return res.status(400).json({ message: "no Words found" })
        return res.json(foundWords)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// create my word for user
const createMyWord = async (req, res) => {
    try {
        const { word } = req.body
        const rateing = Number(req.body.rateing)

        if (!word)
            return res.status(400).send('word is required')

        const user = req.user

        const foundCategory = await MyCategory.findOne({ user: user._id, name: word.categoryName }).exec()
        if (!foundCategory)
            return res.status(404).json({ message: 'Category not found' })

        const newWord = await MyWord.create({ word, user: user._id, rateing })
        if (!newWord)
            return res.status(400).json({ message: `error occurred while creating the word` })

        foundCategory.words.push(newWord._id)
        const updatedCategory = await foundCategory.save()

        if (!updatedCategory) {
            await MyWord.findByIdAndDelete(newWord._id)
            return res.status(400).json({ message: `error occurred while updating category, word was not saved` })
        }

        return res.status(201).json({ message: `word ${word.word} was created successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// delete my word for user
const deleteMyWord = async (req, res) => {
    try {
        const { id } = req.body
        const user = req.user

        if (!id)
            return res.status(400).send('id is required')

        const foundWord = await MyWord.findById(id).exec()
        if (!foundWord)
            return res.status(404).json({ message: "no word found" })

        const foundCategory = await MyCategory.findOne({ user: user._id, name: foundWord.word.categoryName }).exec()
        if (!foundCategory)
            return res.status(404).json({ message: "no category found" })

        foundCategory.words = foundCategory.words.filter(wordId => wordId.toString() !== foundWord._id.toString())
        const updatedCategory = await foundCategory.save()

        if (!updatedCategory) {
            return res.status(400).json({ message: `error occurred while updating category, word was not deleted` })
        }

        const deletedWord = await foundWord.deleteOne()
        if (!deletedWord) {
            foundCategory.words.push(foundWord._id)
            await foundCategory.save()
            return res.status(400).json({ message: `error occurred while deleting word with id ${id}` })
        }

        return res.status(201).json({ message: `Word with id ${id} was deleted successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// update my word rating 
const updateMyWordRaiting = async (req, res) => {
    try {
        const { id } = req.body
        const rateing = Number(req.body.rateing)

        if (!id || rateing === undefined || rateing === null)
            return res.status(400).send('id and rateing are required')

        if (rateing < 0 || rateing > 5)
            return res.status(400).send('rateing must be between 0 to 5')

        const foundWord = await MyWord.findById(id).exec()
        if (!foundWord)
            return res.status(404).json({ message: "no word found" })

        foundWord.rateing = rateing
        const updatedWord = await foundWord.save()
        if (!updatedWord)
            return res.status(400).json({ message: `error occurred while updating word rateing` })

        return res.status(201).json({ message: `word rateing was updated successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// update my word 
const updateMyWord = async (req, res) => {
    try {
        const { id, word } = req.body
        const rateing = Number(req.body.rateing)
        const user = req.user

        if (!id || !word || rateing === undefined || rateing === null)
            return res.status(400).send('id, word and rateing are required')

        if (rateing < 0 || rateing > 5)
            return res.status(400).send('rateing must be between 0 to 5')

        const foundCategory = await MyCategory.findOne({ user: user._id, name: word.categoryName }).exec()
        if (!foundCategory)
            return res.status(404).json({ message: 'Category not found' })

        const foundWord = await MyWord.findById(id).exec()
        if (!foundWord)
            return res.status(404).json({ message: "no word found" })

        const prevCategoryName = foundWord.word.categoryName

        foundWord.word = word
        foundWord.rateing = rateing

        const updatedWord = await foundWord.save()
        if (!updatedWord)
            return res.status(400).json({ message: `error occurred while updating word` })

        if (prevCategoryName !== word.categoryName) {
            foundCategory.words.push(updatedWord._id)
            const foundPrevCategory = await MyCategory.findOne({ user: user._id, name: prevCategoryName }).exec()
            if (foundPrevCategory) {
                foundPrevCategory.words = foundPrevCategory.words.filter(wordId => wordId.toString() !== foundWord._id.toString())
            }

            const [updatedCategory, updatedPrevCategory] = await Promise.all([
                foundCategory.save(),
                foundPrevCategory.save()
            ])

            if (!updatedCategory || !updatedPrevCategory) {
                foundWord.word.categoryName = prevCategoryName
                await foundWord.save()
                return res.status(400).json({ message: `error occurred while updating word` })
            }
        }

        return res.status(201).json({ message: `word was updated successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { getAllMyWords, createMyWord, deleteMyWord, updateMyWordRaiting, updateMyWord }