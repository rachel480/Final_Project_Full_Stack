const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Question"
    },
}, { timestamps: true })

module.exports = mongoose.model('Challenge', challengeSchema)