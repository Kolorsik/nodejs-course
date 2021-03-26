import {Schema} from 'mongoose';

export const employWorkerSchema = new Schema({
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