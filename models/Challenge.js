const mongoose=require('mongoose')

const challengeSchema=new mongoose.Schema({
    question:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"Question"
    },
    grade:{
        type:Number,
        required:true,
        default:0,

    }
},{timestamps:true})

module.exports=mongoose.model('Challenge',challengeSchema)