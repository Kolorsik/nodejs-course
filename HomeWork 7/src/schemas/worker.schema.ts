import {Schema} from 'mongoose'

export const workerSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})