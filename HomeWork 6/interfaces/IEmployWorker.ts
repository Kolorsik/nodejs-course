import {Document} from 'mongoose';
import IWork from './IWork';
import IWorker from './IWorker';

export default interface IEmployWorker extends Document {
    worker: String | IWorker,
    work: String | IWork,
    date: Date
}