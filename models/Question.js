const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
        required: true
    },
    correctAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
        required: true
    },
    //אפשרויות למענה
    options: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Word",
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Question', questionSchema)