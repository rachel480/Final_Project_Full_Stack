const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"],
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Category"
    },

}, { timestamps: true })



module.exports = mongoose.model('Course', courseSchema)