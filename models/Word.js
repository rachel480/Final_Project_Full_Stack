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
  categoryName: {
    type: String,
    required: true,
    lowerCase: true,
    trim: true

  },
  img: {
    data: {
      type:Buffer,
      required:true
    },
    contentType:{
      type:String,
      required:true
    } 

  }
}, { timestamps: true })



module.exports = mongoose.model('Word', wordSchema)