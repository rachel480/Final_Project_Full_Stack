const Challenge=require('../models/Challenge')
//get all challenge for admin and user
const getAllChallenges=async(req,res)=>{
  const challenges=await Challenge.find().lean()
  if(!challenges)
    return res.status(400).json({ message: 'no challenges found' })
 res.json(challenges)
}
//get challenge by id for admin and user
const getSingleChallenge=async(req,res)=>{
    const { id } = req.params
    //validetion
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const  foundChallenge =await Challenge.findById(id).lean()
    if (!foundChallenge)
        return res.status(400).json({ message: 'no challenges found' })
    res.json(foundChallenge)

}
//creat new challenge for admin
const createNewChallenge=async(req,res)=>{
    const { questions}=req.body
    //validetion
     //chek if user is admin
     const user = req.user
     if (user.roles === 'User')
         return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!questions)
        return res.status(400).send('question are required')
    const newChallenge=await Challenge.create({questions})
    if (!newChallenge)
        return res.status(400).json({ message: `error occurred while createing  the challenge ` })
    return res.status(201).json({ message: `challenge created successfully` })
}
//update challenge for admin
const updateChallenge=async(req,res)=>{
    const { questions,id}=req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!questions||!id)
        return res.status(400).send('question and id are required')
    const foundChallenge=await Challenge.findById(id).exec()
    if (!foundChallenge)
        return res.status(400).json({ message: 'no challenges found' })
    //update fields
    foundChallenge.questions=questions
    const updatedChallenge=await foundChallenge.save()
    if (!updatedChallenge)
        return res.status(400).json({ message: `error occurred while updateing challenge` })
    return res.status(201).json({ message: `challenge updated successfully` })
}
//delete challenge for admin
const deleteChallenge=async(req,res)=>{
    const {id}=req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundChallenge=await Challenge.findById(id).exec()
    if (!foundChallenge)
        return res.status(400).json({ message: 'no challenges found' })
    const deletedChallenge=await foundChallenge.deleteOne()
    if(!deletedChallenge)
        return res.status(400).json({ message: `error occurred while deleting challenge ${id}` })
    return res.status(201).json({ message: `challenge with id ${id} was deletd successfully` })

}

module.exports={getAllChallenges,getSingleChallenge,createNewChallenge,updateChallenge,deleteChallenge}
