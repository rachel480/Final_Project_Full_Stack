const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        lowerCase: true,
        trim: true
    },

    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Challenge",
    },
    
    level: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"]
    },
    words:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Word"}],
            default:[]
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Category', CategorySchema)