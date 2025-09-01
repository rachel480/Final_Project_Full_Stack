const mongoose = require('mongoose')

const myCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        lowerCase: true,
        trim: true
    },
    words: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "MyWord" }],
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('MyCategory', myCategorySchema)