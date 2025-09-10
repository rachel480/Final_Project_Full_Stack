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
    
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Course'
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