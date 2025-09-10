require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Course = require('../models/Course')
const UserProgress = require('../models/UserProgress')

const createInitialAdmin = async () => {

    //create admin user
    const adminUser = await User.findOne({ roles: "Admin" }).lean()
    if (!adminUser) {
        const hashPwd = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        const newAdmin = await User.create({
            userName: process.env.ADMIN_USERNAME,
            password: hashPwd,
            fullName: process.env.ADMIN_FULLNAME,
            email: process.env.ADMIN_EMAIL,
            roles: ["Admin", "User"]
        })
        if (!newAdmin) {
            console.log('Error creating admin user')
            return
        }
        console.log('Admin user created')

        //create user progress for admin
        //get all the courses ID's
        const courses = await Course.find({}, { _id: 1 }).lean() || []
        const newUserProgress = await UserProgress.create({ user: newAdmin._id, courses })

        if(!newUserProgress)
            console.log("error createing user progress")
        console.log('admin- user progress was created successfully')
    }
}

module.exports = createInitialAdmin
