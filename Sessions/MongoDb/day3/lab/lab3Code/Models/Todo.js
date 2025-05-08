const mongoose = require('mongoose');


const TodoSchema = mongoose.Schema({

        userId:
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        },
        title:
        {
            type:String,
            required:true,
            min:5,
            max:20,
            indexed:true
        },
        status:{
            type:String, 
            optional:true, 
            default:"to-do"
            },
        tags:{
            type:[String],
            optional:true,
            max:10},

        createdAt: {
            type:Date
        }
}, {
    timestamps: true
})
module.exports = mongoose.model('Todo', TodoSchema);