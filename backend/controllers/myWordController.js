
const MyWord = require('../models/MyWord')

//get all my words for user
const getAllMyWords = async (req, res) => {
    const page=Number(req.query.page) ||1
    const limit=Number(req.query.limit)||10
    let sortBy = req.query.sortBy
    
    if (!sortBy || sortBy === 'none' || sortBy === 'sort by') 
        sortBy = 'createdAt'
    
    const user = req.user
    const foundWords = await MyWord.find({ user: user._id })
    .sort({[sortBy]:1})
    .skip((page-1)*limit)
    .limit(limit)
    .lean()
    if (!foundWords|| foundWords.length===0)
        return res.status(400).json({ message: "no Words found" })
    const totalPages= Math.ceil(await MyWord.countDocuments({ user: user._id })/limit)
    return res.json({words:foundWords,totalPages})
}

//create my word for user
const createMyWord = async (req, res) => {
    const { word ,rateing} = req.body

    //validation
    //required fields
    if (!word)
        return res.status(400).send('word is required')

    const user = req.user
    console.log("user",user)
    const newWord = await MyWord.create({ word, user:user._id ,rateing})
    if (!newWord)
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
    const { id, rateing} = req.body

    //validation
    //required fields
    if (!id || !rateing === undefined || rateing === null)
        return res.status(400).send('id and rateing are required')
    
    //if rateing is valid
    if(rateing<0|| rateing>5)
        return res.status(400).send(' rateing must be between 0 to 5')

    
    const foundWord = await MyWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    //update fields
    foundWord.rateing=rateing

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating  word rateing` })
    return res.status(201).json({ message: ` word ratenig was updated successfully` })
}

//update my word raiting 
const updateMyWord = async (req, res) => {
    const { id, rateing,word} = req.body

    //validation
    //required fields
    if (!id || !rateing === undefined || rateing === null ||!word)
        return res.status(400).send('id  word and rateing are required')
    
    //if rateing is valid
    if(rateing<0|| rateing>5)
        return res.status(400).send(' rateing must be between 0 to 5')

    
    const foundWord = await MyWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    //update fields
    foundWord.rateing=rateing
    foundWord.word=word

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating  word ` })
    return res.status(201).json({ message: ` word ratenig was updated successfully` })
}

module.exports = { getAllMyWords, createMyWord, deleteMyWord ,updateMyWordRaiting,updateMyWord}