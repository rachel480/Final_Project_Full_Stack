const mongoose=require('mongoose')

const RecommendtionSchema=new mongoose.Schema({
    recommendtion:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    }  
    
},{
    timestamps:true
})

module.exports=mongoose.model('Recommendtion',RecommendtionSchema)