const Word=require('../models/Word')
//get all Word for admin and user
const getAllWords=async(req,res)=>{
    const words=await Word.find().lean()
    if(!words)
      return res.status(400).json({ message: 'no words found' })
   res.json(words)
  }
  //get Word by id for admin and user
  const getSingleWord=async(req,res)=>{
      const { id } = req.params
      //validetion
      //required fields
      if (!id)
          return res.status(400).send('id is required')
      const  foundWord =await Word.findById(id).lean()
      if (!foundWord)
          return res.status(400).json({ message: 'no words found' })
      res.json(foundWord)
  
  }
  //creat new Word for admin
  const createNewWord=async(req,res)=>{
      const {word,translation,categoryName}=req.body
      //validetion
      //chek if user is admin
      const user = req.user
      if (user.roles === 'User')
          return res.status(403).json({ message: 'Forbidden' })
      //required fields
      if (!word||!translation||!categoryName)
          return res.status(400).send('all fields are required')
      const newWord=await Word.create({word,translation,categoryName})
      if (!newWord)
          return res.status(400).json({ message: `error occurred while createing  the Word ` })
      return res.status(201).json({ message: `word ${word} created successfully` })
  }
  //update Word for admin
  const updateWord=async(req,res)=>{
      const {word,translation,categoryName,id}=req.body
      //validetion
       //chek if user is admin
       const user = req.user
       if (user.roles === 'User')
           return res.status(403).json({ message: 'Forbidden' })
      //required fields
      if (!word||!translation||!categoryName||!id)
          return res.status(400).send('all fields are required')
      const foundWord=await Word.findById(id).exec()
      if (!foundWord)
          return res.status(400).json({ message: 'no words found' })
      //update fields
      foundWord.word=word
      foundWord.translation=translation
      foundWord.categoryName=categoryName
      const updatedWord=await foundWord.save()
      if (!updatedWord)
          return res.status(400).json({ message: `error occurred while updateing word` })
      return res.status(201).json({ message: `word updated successfully` })
  }
  //delete Word for admin
  const deleteWord=async(req,res)=>{
      const {id}=req.body
      //validetion
      //chek if user is admin
      const user = req.user
      if (user.roles === 'User')
          return res.status(403).json({ message: 'Forbidden' })
      //required fields
      if (!id)
          return res.status(400).send('id is required')
      const foundWord=await Word.findById(id).exec()
      if (!foundWord)
          return res.status(400).json({ message: 'no words found' })
      const deletedWord=foundWord.deleteOne()
      if(!deletedWord)
          return res.status(400).json({ message: `error occurred while deleting word ${id}` })
      return res.status(201).json({ message: `word with id ${id} was deletd successfully` })
  
  }
  
  module.exports={getAllWords,getSingleWord,createNewWord,updateWord,deleteWord}
  