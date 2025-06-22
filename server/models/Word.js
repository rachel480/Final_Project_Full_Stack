const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema(
    {
        word:{
            type:String,
            required:true,
            lowerCase:true,
            trim:true
        },
        translation:{
            type:String,
            required:true,
            trim:true
        },
        categoryName:{
            type:String,
            required:true,
            lowerCase:true,
            trim:true
        },
        img:{
            data:Buffer,
            contentType:String
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('Word', wordSchema)