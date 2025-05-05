const User = require('../models/User')
//get all users only for admin
const getAllUser = async (req, res) => {
    const  user  = req.user
    //chek if user is admin
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    const users = await User.find({}, { password: 0 }).lean()
    if (!users)
        return res.status(400).json({ message: 'no users found' })
    res.json(users)
}
//get one users only for admin and user
const getSingleUser = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')

    //chek if user is admin or user
    const  user  = req.user
    let findedUser
    if (user.roles === 'Admin')
        findedUser = await User.findOne({ _id: id }, { password: 0 }).lean()
    else
        findedUser = await User.findOne({ userName: user.userName, _id: id }, { password: 0 }).lean()
    if (!findedUser)
        return res.status(400).json({ message: 'no user found' })
    res.json(findedUser)

}
//put only for user
const updateUser = async (req, res) => {
    const { id, fullName, email, phone, password, userName } = req.body
    if (!id || !fullName || !email || !password)
        return res.status(400).send('id fullName email and password is required')
    const user  = req.user
    const findedUser = await User.findOne({ userName: user.userName, _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: 'no user found' })
    //update fields
    findedUser.userName = userName?userName:user.userName
    findedUser.fullName = fullName
    findedUser.email = email
    findedUser.password = password
    findedUser.phone = phone

    //chek if userName is unique
    if (userName != user.userName) {
        const existUser = await User.findOne({ userName: userName }).lean()
        if (existUser)
            return res.status(409).json({ message: 'userName must be unique' })
    }
    const updatedUser = await findedUser.save()
    if (!updatedUser)
        return res.status(400).json({ message: `error occurred while updateing user ${userName}` })
    return res.status(201).json({ message: `user ${user.userName} was updated successfully` })
}
//delete admin
const deleteUser = async (req, res) => {
    //validation
    //required fields
    const { id } = req.body
    if (!id)
        return res.status(400).send('id is required')
    const user  = req.user
    //chek if user is admin
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    const findedUser = await User.findOne({ _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: 'no user found' })
    const deletedUser = await findedUser.deleteOne()
    if (!deletedUser)
        return res.status(400).json({ message: `error occurred while deleteding user ${userName}` })
    return res.status(201).json({ message: `user with id ${id} was deleted successfully` })
}
//update active only admain
const updateUserByAdmit = async (req, res) => {
    //validation
    //required fields
    const { id,active,roles } = req.body
    if (!id)
        return res.status(400).send('id is required')
    const  user  = req.user
    //chek if user is admin
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    const findedUser = await User.findOne({ _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: 'no user found' })
    findedUser.roles=roles?roles:findedUser.roles
    findedUser.active = active?active:findedUser.active
    const updatedUser = await findedUser.save()
    if (!updatedUser)
        return res.status(400).json({ message: `error occurred while updateing user ${userName}` })

    return res.status(201).json({ message: `user with id ${id}  was updated successfully` })

}
module.exports = { getAllUser, getSingleUser, updateUser, deleteUser, updateUserByAdmit }