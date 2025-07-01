const User =require('../models/User')

//checks if there is a userName in the database
const checkUsernameUniqueness=async(userName)=>{
    const existUser= await User.findOne({userName}).lean()
    if(existUser)
        return true
    return false
}

module.exports=checkUsernameUniqueness