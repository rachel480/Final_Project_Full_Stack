const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    wordList:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"Word"
    },
    challenge:{
     type:[mongoose.Schema.Types.ObjectId],
     required:true,
     ref:"Challenge"
    }
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema)