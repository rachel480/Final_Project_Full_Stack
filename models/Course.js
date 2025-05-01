const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    level:{
        type:String,
        require:true,
        enum:["Easy","Medium","Hard"], 
    },
    fullWordList:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"Word"
    },
    categories:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"Category"
    },
    solvedChalenges:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"Challenge"
    },
    user:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"User"
    }

},{timestamps:true})



module.exports=mongoose.model('Course',courseSchema)