const {Schema, model} = require('mongoose');

const workSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    hoursPerDay: {
        type: Number,
        required: true
    }
})

module.exports = model('work', workSchema);