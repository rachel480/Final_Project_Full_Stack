const mongoose = require('mongoose')
const {wordSchema}=require('../models/Word')

const MyWordSchema = new mongoose.Schema(
    {
        word:{
            type:wordSchema,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        rateing:{
            type:Number,
            min:0,
            max:5,
            default:0,
        }
    },

    {
        timestamps:true
    })

module.exports = mongoose.model('MyWord', MyWordSchema)
