import {Schema, model} from 'mongoose';
import IWork from '../interfaces/IWork';

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

export default model<IWork>('work', workSchema);