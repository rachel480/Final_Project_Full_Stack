const mongoose = require('mongoose')

const ChallengeSchema = new mongoose.Schema(
    {
       questions:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}],
        required:true,
       },
    },

    {
        timestamps: true
    }
)
module.exports = mongoose.model('Challenge', ChallengeSchema)