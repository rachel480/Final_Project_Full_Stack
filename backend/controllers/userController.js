const User = require('../models/User')
const bcrypt = require('bcrypt')

//a service that checks if userName is availble
const checkUsernameUniqueness = require('../services/userService.js')

//get all users only for admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).lean()
        if (!users)
            return res.status(400).json({ message: "no users found" })
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//get one user only for admin and user
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params

        //validation
        if (!id)
            return res.status(400).send('id is required')

        //chek if user is admin or user
        const user = req.user
        let foundUser

        if (user.roles.includes("Admin"))
            foundUser = await User.findOne({ _id: id }, { password: 0 }).lean()

        else
            foundUser = await User.findOne({ userName: user.userName, _id: id }, { password: 0 }).lean()

        if (!foundUser)
            return res.status(400).json({ message: "no user found" })

        res.json(foundUser)
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

const createNewUserByAdmin = async (req, res) => {
    try {
        const { userName, password, fullName, email, phone, roles, active } = req.body

        // validation:
        if (!userName || !password || !fullName || !email)
            return res.status(400).json({ message: 'userName fullName password and email are required' })

        // unique userName
        const existUser = await checkUsernameUniqueness(userName)
        if (existUser)
            return res.status(409).json({ message: 'userName must be unique' })

        // encrypt password:
        const hashPwd = await bcrypt.hash(password, 10)

        // create user:
        const user = await User.create({ userName, password: hashPwd, fullName, email, phone, roles, active })

        if (!user)
            return res.status(400).json({ message: `error occurred while creating user ${userName}` })

        return res.status(201).json({ message: `user ${userName} was created successfully` })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//put only for user and admin
const updateUserByUser = async (req, res) => {
    try {
        const { id, fullName, email, phone, password, userName } = req.body

        //validation
        //required fields
        if (!id || !fullName || !email || !password)
            return res.status(400).send('id fullName email and paswword are required')

        const user = req.user
        foundUser = await User.findOne({ userName: user.userName, _id: id }).exec()

        if (!foundUser)
            return res.status(400).json({ message: "no user found" })

        const prevUserName = foundUser.userName
        //update fields
        foundUser.userName = userName ? userName : user.userName
        foundUser.password = password
        foundUser.phone = phone
        foundUser.email = email
        foundUser.fullName = fullName

        //chek if userName is unique
        if (userName != prevUserName) {
            const existUser = await checkUsernameUniqueness(userName)
            if (existUser)
                return res.status(409).json({ message: 'userName must be unique' })
        }
        const updatedUser = await foundUser.save()
        if (!updatedUser)
            return res.status(400).json({ message: `error occurred while updating user ${userName}` })
        return res.status(201).json({ message: `user ${user.userName} was updated successfully` })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

const updateUserByAdmin = async (req, res) => {
    try {
        const { id, roles, active } = req.body

        if (!id)
            return res.status(400).send('id is required')

        foundUser = await User.findById(id).exec()

        if (!foundUser)
            return res.status(400).json({ message: "no user found" })

        //update fileds
        foundUser.roles = roles ? roles : foundUser.roles
        foundUser.active = active ===null ? foundUser.active: active 

        const updatedUser = await foundUser.save()
        if (!updatedUser)
            return res.status(400).json({ message: `error occurred while updating user ${foundUser.userName}` })
        return res.status(201).json({ message: `user ${foundUser.userName} was updated successfully` })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//delete for admin
const deleteUser = async (req, res) => {
    try {
        //validation:
        //chek required fields
        const { id } = req.body
        if (!id)
            return res.status(400).send('id is required')

        const foundUser = await User.findOne({ _id: id }).exec()
        if (!foundUser)
            return res.status(400).json({ message: "no user found" })
        const deletedUser = await foundUser.deleteOne()
        if (!deletedUser)
            return res.status(400).json({ message: `error occurred while updating user ${userName}` })
        return res.status(201).json({ message: `user with id ${id} was deleted successfully` })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

const checkUserNameAvailability = async (req, res) => {
    try {
        const { userName } = req.params
        if (!userName)
            return res.status(400).json({ message: 'userName is required' })
        const foundUser = await checkUsernameUniqueness(userName)
        if (foundUser)
            return res.send(true)
        return res.send(false)
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { getAllUsers, getSingleUser, createNewUserByAdmin, updateUserByUser, updateUserByAdmin, deleteUser, checkUserNameAvailability }
