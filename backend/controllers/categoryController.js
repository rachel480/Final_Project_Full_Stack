const Category = require('../models/Category')

//get all categories for admin and user
const getAllCategories = async (req, res) => {
    const categories = await Category.find().lean()
    if (!categories)
        return res.status(400).json({ message: "no categories found" })
    res.json(categories)
}

//get by id for admin and user
const getSingleCategory = async (req,res) => {
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
    const { name, challenge,level} = req.body

    //validation:
    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })
    
    //required fields
    if (!name || !level || !challenge)
        return res.status(400).send('all fields are required')

    const newCategory = await Category.create({ name,level,challenge})
    if (!newCategory)
        return res.status(400).json({ message: `error occurred while creating category ${name}` })
    return res.status(201).json({ message: `category ${name} was created successfully` })
}

//update only for admin
const updateCategory = async (req, res) => {
    const { id, name, challenge,level} = req.body

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
const deleteCategory=async(req,res)=>{
    const {id}=req.body

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
    if(!deletedCategory)
        return res.status(400).json({ message: `error occurred while deleting category with id ${id}` })
    return res.status(201).json({ message: `category with id ${id} was deleted successfully` }) 
}

module.exports={getAllCategories,getSingleCategory,createCategory,updateCategory,deleteCategory}