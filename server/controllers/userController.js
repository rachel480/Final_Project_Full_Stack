const User = require('../models/User')

//get all users only for admin
const getAllUsers = async (req, res) => {
    const user= req.user
    //chek if user is admin
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })
    const users = await User.find({}, { password: 0 }).lean()
    if (!users)
        return res.status(400).json({ message: "no users found" })
    res.json(users)
}

//get one user only for admin and user
const getSingleUser = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')
    //chek if user is admin or user
    const user= req.user
    let findedUser
    if (user.roles === "Admin")
        findedUser = await User.findOne({ _id: id }, { password: 0 }).lean()
    else
        findedUser = await User.findOne({ userName: user.userName, _id: id }, { password: 0 }).lean()
    if (!findedUser)
        return res.status(400).json({ message: "no user found" })
    res.json(findedUser)
}

//put only for user and admin
const updateUser = async (req, res) => {
    const { id, fullName, email, phone, password, userName,active,roles} = req.body

    //validation
    //required fields
    if (!id || !fullName || !email || !password)
        return res.status(400).send('id fullName email and paswword are required')

    const user= req.user
    let foundUser
    if(user.roles==="User")
        foundUser = await User.findOne({ userName: user.userName, _id: id }).exec()
    else
        foundUser=await User.findById(id).exec()
    if (!foundUser)
        return res.status(400).json({ message: "no user found" })

    const prevUserName=foundUser.userName
    //update fields
    foundUser.userName = userName?userName:user.userName
    foundUser.password = password
    foundUser.phone = phone
    foundUser.email = email
    foundUser.fullName = fullName
    foundUser.roles=user.roles==="Admin"?roles:user.roles
    foundUser.active=user.roles==="Admin"?active:user.roles

    //chek if userName is unique
    if (userName != prevUserName) {
        const existUser = await User.findOne({ userName: userName }).lean()
        if (existUser)
            return res.status(409).json({ message: 'userName must be unique' })
    }
    const updatedUser = await foundUser.save()
    if (!updatedUser)
        return res.status(400).json({ message: `error occurred while updating user ${userName}` })
    return res.status(201).json({ message: `user ${user.userName} was updated successfully` })
}

//delete for admin
const deleteUser = async (req, res) => {
    //validation:

    //chek required fields
    const { id } = req.body
    if (!id)
        return res.status(400).send('id is required')

    //chek if user is admin
    const user= req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    const findedUser = await User.findOne({ _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: "no user found" })
    const deletedUser = await findedUser.deleteOne()
    if (!deletedUser)
        return res.status(400).json({ message: `error occurred while updating user ${userName}` })
    return res.status(201).json({ message: `user with id ${id} was deleted successfully` })
}

module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser}