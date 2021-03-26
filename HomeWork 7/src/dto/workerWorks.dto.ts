import IEmployWorker from '../interfaces/employWorker.interface';

export class WorkerWorksDto {
    readonly works: IEmployWorker[];
    readonly totalSalary: number;
}