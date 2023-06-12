const mongoose = require("mongoose");

const { Schema } = mongoose; // this is destructuring. I am trying to fetch schema from mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',UserSchema);