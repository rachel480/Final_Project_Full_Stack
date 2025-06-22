require('dotenv').config()
const bcrypt=require('bcrypt')
const User=require('../models/User')

const createInitialAdmin=async()=>{
    const adminUser=await User.findOne({roles:"Admin"}).lean()
    if(!adminUser)
    {
        const hashPwd=await bcrypt.hash(process.env.ADMIN_PASSWORD,10)
        const newAdmin=await User.create({
            userName:process.env.ADMIN_USERNAME,
            password:hashPwd,
            fullName:process.env.ADMIN_FULLNAME,
            email:process.env.ADMIN_EMAIL,
            roles:"Admin"
        }) 
        if(!newAdmin)
        {
            console.log('Error creating admin user')
            return
        }
        console.log('Admin user created')
    }
}

module.exports = createInitialAdmin