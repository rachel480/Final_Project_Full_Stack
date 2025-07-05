const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//a service that checks if userName is availble
const checkUsernameUniqueness = require('../services/userService.js')

const register = async (req, res) => {
    const { userName, password, fullName, email, phone } = req.body

    //validation:

    //required fields
    if (!userName || !password || !fullName || !email) {
        return res.status(400).json({ message: 'userName fullName password and email are required' })
    }

    //unique userName
    const existUser = await checkUsernameUniqueness(userName)
    if (existUser)
        return res.status(409).json({ message: 'userName must be unique' })

    //encrypt password:
    const hashPwd = await bcrypt.hash(password, 10)

    //create user:
    const user = await User.create({ userName, password: hashPwd, fullName, email, phone })

    if (!user)
        return res.status(400).json({ message: `error occurred while creating user ${userName}` })

    return res.status(201).json({ message: `user ${userName} was created successfully` })
}

const login = async (req, res) => {
    const { userName, password } = req.body

    //validation:

    //required fields
    if (!userName || !password) 
        return res.status(400).json({ message: 'userName and password are required'})

    //exist user or active
    const existUser=await User.findOne({userName}).lean()
    if(!existUser || !existUser.active)
        return res.status(401).json({message:"Unauthorized"})

    //correct password
    const match=await bcrypt.compare(password,existUser.password)
    if(!match)
        return res.status(401).json({message:"Unauthorized"})

    //create token
    const userInfo={_id:existUser._id,fullName:existUser.fullName,roles:existUser.roles,userName:existUser.userName,email:existUser.email}
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)

    res.status(201).json({message:"login successfully",accessToken:accessToken})
}

module.exports = { login, register }