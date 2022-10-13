const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, required: true, default: false },
    activationLink: { type: String }
})

module.exports = model('User', userSchema)