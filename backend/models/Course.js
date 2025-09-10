const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            lowerCase: true,
            trim: true
        },
        level: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"]
        },

        categories: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
            default: [],
        },
        status: {
         type: String, enum: ["draft", "published"],
         default:"draft"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Course', CourseSchema)