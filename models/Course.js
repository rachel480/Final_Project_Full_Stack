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
        default:[],
        ref:"Challenge"
    },
    userId:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"User"
    }

},{timestamps:true})



module.exports=mongoose.model('Course',courseSchema)