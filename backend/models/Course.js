const mongoose=require('mongoose')

const CourseSchema=new mongoose.Schema(
    {
        level:{
            type:String,
            required:true,
            enum:["Easy","Medium","Hard"]
        },

        categories:{
            type:[{type:mongoose.Schema.Types.ObjectId,ref:"Category"}],
            required:true,
        },
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Course',CourseSchema)