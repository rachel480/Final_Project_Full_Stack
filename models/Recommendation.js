const mongoose=require('mongoose')

const recommendationSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    recommendation:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5  
    }
},{timestamps:true})



module.exports=mongoose.model('Recommendation',recommendationSchema)