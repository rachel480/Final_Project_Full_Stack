const mongoose = require('mongoose')

const FavoriteWordSchema = new mongoose.Schema(
    {
        word:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Word',
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
            default:0
        }
    },

    {
        timestamps:true
    })

module.exports = mongoose.model('FavoriteWord', FavoriteWordSchema)