import {Schema, model} from 'mongoose';
import IEmployWorker from '../interfaces/IEmployWorker';

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

export default model<IEmployWorker>('employWorker', employWorkerSchema);