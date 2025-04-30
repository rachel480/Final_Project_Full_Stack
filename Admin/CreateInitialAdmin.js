require('dotenv').config()
const bcypt=require('bcrypt')
const User=require('../models/User')
const createInitialAdmin=async()=>{
    const adminUser=await User.findOne({roles:"Admin"}).lean()
    if(!adminUser){
        const hashPwd=await bcypt.hash(process.env.ADMIN_PASSWORD,10)
        const newAdmit=await User.create({
            userName:process.env.ADMIN_USERNAME,
            password:hashPwd,
            email:process.env.ADMIN_EMAIL,
            fullName:process.env.ADMIN_FULLNAME,
            roles:"Admin"
        })
        if(!newAdmit){
            console.log('Error creating admin user')
            return
        }
       console.log('Admin user created')
    }
}
module.exports=createInitialAdmin
