
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
        username: 
        {
            type:String,
            required:true,
            unique: true
        },
        password : 
        {
            type:String,
            required:true,
        },
        firstName:
        {
            type:String,
            required:true,
            min:10,
            max:100
        },
        age:
        {
            type:Number,
            min:13
        }
}, {
    strict: false,
    timestamps: true
})


// const User =new User()
const User = mongoose.model('User', userSchema);

module.exports = User;