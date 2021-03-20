const {Schema, model} = require('mongoose');

const workerSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = model('worker', workerSchema);