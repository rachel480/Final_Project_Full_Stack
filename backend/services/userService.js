const User =require('../models/User')

//checks if there is a userName in the database
const checkUsernameUniqueness=async(userName)=>{
    const existUser= await User.findOne({userName}).lean()
    if(existUser)
        return true
    return false
}

//checks if there is a email in the database
const checkEmailUniqueness=async(email)=>{
    const existEmail= await User.findOne({email}).lean()
    if(existEmail)
        return true
    return false
}

module.exports={checkUsernameUniqueness,checkEmailUniqueness}