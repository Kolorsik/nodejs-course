import {Document} from 'mongoose';
import IWork from './work.interface';
import IWorker from './worker.interface';

export default interface IEmployWorker extends Document {
    worker: String | IWorker,
    work: String | IWork,
    date: Date
}