const mongoose = require('mongoose')

const userProgressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        courses: {
            type: [{type:mongoose.Schema.Types.ObjectId,ref:"Course"}],
            required: true,
        },
        completedCategories: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
            default: []
        },
        challengeResults: {
            type: [
                {                                                                                           
                    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
                    answers: [{
                        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
                        userAnswer: { type: String, default: "" },
                        isCorrect: { type: Boolean, default: false },
                        grade: { type: Number, default: 0 }
                    }],
                    totalScore: { type: Number, default: 0 },
                    completedAt: { type: Date ,default:null}
                }
            ],
            default:[]
        }

    },
    {
        timestamps: true
    })
module.exports = mongoose.model('UserProgress', userProgressSchema)