import {Schema, model} from 'mongoose'
import IWorker from '../interfaces/IWorker';

const workerSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

export default model<IWorker>('worker', workerSchema);