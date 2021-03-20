const {Schema, model} = require('mongoose');

const employWorkerSchema = new Schema({
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'worker'
    },
    work: {
        type: Schema.Types.ObjectId,
        ref: 'work'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('employWorker', employWorkerSchema);