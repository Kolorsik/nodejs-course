import IWork from '../interfaces/work.interface';
import IWorker from '../interfaces/worker.interface';

export class EmployWorkerDto {
    readonly worker: String | IWork;
    readonly work: String | IWorker;
    readonly date: Date;
}