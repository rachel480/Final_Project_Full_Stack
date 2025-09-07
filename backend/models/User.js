const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowerCase:true
    },
    phone:{
      type:String,
    },
    roles:{
       type:[String],
       enum:['User','Admin'],
       default:['User']
    },
    active:{
       type:Boolean,
       default:true
    }
},{
    timestamps:true
})



module.exports=mongoose.model('User',UserSchema)