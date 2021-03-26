import {Schema} from 'mongoose';

export const workSchema = new Schema({
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