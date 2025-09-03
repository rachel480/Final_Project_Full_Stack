
const FavoriteWord = require('../models/FavoriteWord')

//get all favorite words for user
const getAllFavoriteWords = async (req, res) => {
    const page=Number(req.query.page) ||1
    const limit=Number(req.query.limit)||10
    let sortBy = req.query.sortBy
    
    if (!sortBy || sortBy === 'none' || sortBy === 'sort by') 
        sortBy = 'createdAt'
    
    const user = req.user
    const foundWords = await FavoriteWord.find({ user: user._id })
    .populate('word')
    .sort({[sortBy]:1})
    .skip((page-1)*limit)
    .limit(limit)
    .lean()
    if (!foundWords)
        return res.status(400).json({ message: "no Words found" })
    const totalPages= Math.ceil(await FavoriteWord.countDocuments({ user: user._id })/limit)
    return res.json({words:foundWords,totalPages})
}

//create favorite word for user
const toggleFavoriteWord = async (req, res) => {
    const { word } = req.body

    //validation
    //required fields
    if (!word)
        return res.status(400).send('word is required')

    const user = req.user
   //check if word exsists
   const foundWord=await FavoriteWord.findOne({user:user._id,word}).exec()
   if(foundWord)
   {
    //remove from favorites
    const deletedWord=await foundWord.deleteOne()
    if(!deletedWord)
        return res.status(400).json({ message: `error occurred while deleting favorite word ` })
    return res.json({message:`word with id:${word
        
    } was removed successfully from favorite`})
   }
   //add to favorites
    const newWord = await FavoriteWord.create({ word, user:user._id })
    if (!newWord)
        return res.status(400).json({ message: `error occurred while creating the word` })
    return res.status(201).json({ message: `word created successfully` })
}
//delete favorite word for user
const deleteFavoriteWord = async (req, res) => {
    const { id } = req.body

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const foundWord = await FavoriteWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    const deletedWord = await foundWord.deleteOne()
    if (!deletedWord)
        return res.status(400).json({ message: `error occurred while deleting favorite word with id ${id}` })
    return res.status(201).json({ message: `favorite word with id ${id} was deleted successfully` })
}

//update favorite word raiting 
const updateFavoriteWordRaiting = async (req, res) => {
    const { id, rateing} = req.body

    //validation
    //required fields
    if (!id || !rateing === undefined || rateing === null)
        return res.status(400).send('id and rateing are required')
    
    //if rateing is valid
    if(rateing<0|| rateing>5)
        return res.status(400).send(' rateing must be between 0 to 5')

    
    const foundWord = await FavoriteWord.findById(id).exec()
    if (!foundWord)
        return res.status(400).json({ message: "no word found" })

    //update fields
    foundWord.rateing=rateing

    const updatedWord = await foundWord.save()
    if (!updatedWord)
        return res.status(400).json({ message: `error occurred while updating favorite word rateing` })
    return res.status(201).json({ message: `favorite word ratenig was updated successfully` })
}

module.exports = { getAllFavoriteWords, toggleFavoriteWord, deleteFavoriteWord ,updateFavoriteWordRaiting}