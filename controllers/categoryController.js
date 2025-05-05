const Category = require('../models/Category')



//get all for admin and user

const getAllCategories = async (req, res) => {
    const categories = await Category.find().lean()
    if (!categories)
        return res.status(400).json({ message: 'no categories found' })
    res.json(categories)
}

//get by id for admin user
const getSingleCategory = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')
    const foundCategory = await Category.findById(id).lean()
    if (!foundCategory)
        return res.status(400).json({ message: 'no categories found' })
    res.json(foundCategory)
}

//create only for admin
const createCategory = async (req, res) => {
    const { name, wordsList, challenge } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!name || !wordsList || !challenge)
        return res.status(400).send('all fields are required')
    const newCategory = await Category.create({ name, wordsList, challenge })
    if (!newCategory)
        return res.status(400).json({ message: `error occurred while createing category ${name}` })
    return res.status(201).json({ message: `category ${name} was created successfully` })
}
//update only for admin
const updateCategory = async (req, res) => {
    const { id, name, wordsList, challenge } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!id || !name || !wordsList || !challenge)
        return res.status(400).send('all fields are required')
    const foundCategory = await Category.findById(id).exec()
    if (!foundCategory)
        return res.status(400).json({ message: 'no categories found' })
    //update fields
    foundCategory.name = name
    foundCategory.wordsList = wordsList
    foundCategory.challenge = challenge
    const updatedCategory= await foundCategory.save()
    if (!updatedCategory)
        return res.status(400).json({ message: `error occurred while updateing category ${name}` })
    return res.status(201).json({ message: `category ${user.userName} was updated successfully` })

}
//delete only for admin
const deleteCategory=async(req,res)=>{
    const {id}=req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundCategory = await Category.findById(id).exec()
    if (!foundCategory)
        return res.status(400).json({ message: 'no categories found' })
    const deletedCatgory=await foundCategory.deleteOne()
    if(!deletedCatgory)
        return res.status(400).json({ message: `error occurred while deleting category ${id}` })
    return res.status(201).json({ message: `category with id ${id} was deletd successfully` })

}

module.exports={getAllCategories,getSingleCategory,createCategory,updateCategory,deleteCategory}

