const mongoose = require('mongoose')

const MyWordSchema = new mongoose.Schema(
    {
        word: {
            word: {
                type: String,
                required: true,
                lowerCase: true,
                trim: true
            },
            translation: {
                type: String,
                required: true,
                trim: true
            },
            categoryName: {
                type: String,
                required: true,
                lowerCase: true,
                trim: true
            },
            img: {
                data: { type: Buffer, default: null },     
                contentType: { type: String, default: null }
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rateing: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },

    {
        timestamps: true
    })

module.exports = mongoose.model('MyWord', MyWordSchema)