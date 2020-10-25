const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    todos: {
        type: Array,
        default: [{
            id: String,
            description: String,
            done: Boolean, 
        }]
    }
},{ minimize: true })

const User = mongoose.model('user', userSchema)
module.exports = User