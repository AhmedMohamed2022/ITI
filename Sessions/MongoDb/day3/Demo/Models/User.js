
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50


    },
    age: {
        type: Number,
        required: true,
        max: [100, "max value 100"],
        min: [10, "min value 10"]

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "User",
        enum: ["Admin", "User"]
    }
}, {
    strict: false,
    timestamps: true
})


// const User =new User()
const User = mongoose.model('User', userSchema);

module.exports = User;