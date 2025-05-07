const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Word",
        required:true 
    },
    userAnswer:{
        type:String,
        required:true,
        default:"-",
    },
    correctAnswer:{
        type:String,
        required:true
    },
    
    grade:{
        type:Number,
        required:true,
        default:0,
        min:0,
        max:10
    },
    //אפשרויות למענה
    options:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Word",
        required:true
    }



},{timestamps:true})


module.exports=mongoose.model('Question',questionSchema)