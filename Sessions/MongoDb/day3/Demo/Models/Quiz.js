const mongoose = require('mongoose');


const quizSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    option: {
        type: [String]
    },
    answer: {
        type: Number,
        required: true

    }
}, {
    timestamps: true
})
module.exports = mongoose.model('quiz', quizSchema);