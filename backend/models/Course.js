const mongoose=require('mongoose')

const CourseSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            lowercase:true,
            trim:true
        },

        level:{
            type:String,
            required:true,
            enum:["Easy","Medium","Hard"]
        },

        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

        status: { 
            type: String,
            enum: ["draft", "published"], 
            default: "draft" 
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Course',CourseSchema)