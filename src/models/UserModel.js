const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Age: {
        type: Number,
        required: true,
        trim: true
    },
    City: {
        type: String,
        required: true,
        trim: true
    },
    Zip_code: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    DeletedAt:{
        type:Date
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema

)