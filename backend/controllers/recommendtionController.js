const Recommendion = require('../models/Recommendion')

//get all Recommendion public
const getAllRecommendions = async (req, res) => {
    const recommendions = await Recommendion.find().lean()
    if (!recommendions)
        return res.status(400).json({ message: "no recommendions found" })
    res.json(recommendions)
}

//get recommendion by id public
const getSingleRecommendion = async (req,res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')
    const foundRecommendion = await Recommendion.findById(id).lean()
    if (!foundRecommendion)
        return res.status(400).json({ message: "no Recommendion found" })
    res.json(foundRecommendion)
}

//create recommendion only for user
const createNewRecommendion = async (req, res) => {
    const{recommendtion,userName,rating}= req.body

    //validation:
    //required fields
    if (!recommendtion || !userName || !rating)
        return res.status(400).send('all fields are required')

    //chek if user is not admin
    const user = req.user
    if (user.roles === "Admin")
        return res.status(403).json({ message: 'forbidden' })

    const newRecommendion = await Recommendion.create({recommendtion,userName,rating})
    if (!newRecommendion)
        return res.status(400).json({ message: `error occurred while creating recommendion` })
    return res.status(201).json({ message: `recommendion was created successfully` })
}

//update Recommendion only for admin
const updateRecommendion = async (req, res) => {
    const { id,recommendtion,userName,rating} = req.body
    const user=req.user

    //validation:
    //required fields
    if (!recommendtion || !userName || !rating|| !id)
        return res.status(400).send('all fields are required')

    let foundRecommendion
    if(user.roles==="User")
        foundRecommendion= await Recommendion.findOne({id:id,userName:user.userName}).exec()
    else
        foundRecommendion=await Recommendion.findById(id).exec()

    if (!foundRecommendion)
        return res.status(400).json({ message: "no Recommendion found" })

    //update fields
    foundRecommendion.recommendtion=recommendtion
    foundRecommendion.userName=userName
    foundRecommendion.rating

    const updatedRecommendion = await foundRecommendion.save()
    if (!updatedRecommendion)
        return res.status(400).json({ message: `error occurred while updating recommendion` })
    return res.status(201).json({ message: `recommendion was updated successfully` })
}

//delete Recommendion only for admin
const deleteRecommendion=async(req,res)=>{
    const {id}=req.body
    const user=req.user

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    
    let foundRecommendion
    if(user.roles==="User")
        foundRecommendion = await Recommendion.findOne({id:id,userName:user.userName}).exec()
    else
        foundRecommendion=await Recommendion.findById(id).exec()
    if (!foundRecommendion)
        return res.status(400).json({ message: "no Recommendion found" })

    const deletedRecommendion = await foundRecommendion.deleteOne()
    if(!deletedRecommendion)
        return res.status(400).json({ message: `error occurred while deleting recommendion with id ${id}` })
    return res.status(201).json({ message: `recommendion with id ${id} was deleted successfully` }) 
}

module.exports={getAllRecommendions,getSingleRecommendion,createNewRecommendion,updateRecommendion,deleteRecommendion}