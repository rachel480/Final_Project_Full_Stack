const mongoose = require("mongoose")
const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    trim: true,
    lowerCase: true,
    required: true
  },
  translation: {
    type: String,
    trim: true,
    required: true
  },
  img: {
    data: Buffer,
    contentType: String

  }
}, { timestamps: true })



module.exports = mongoose.model('Word', wordSchema)