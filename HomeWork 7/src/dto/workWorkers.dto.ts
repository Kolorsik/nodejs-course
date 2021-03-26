import IEmployWorker from '../interfaces/employWorker.interface';

export class WorkWorkersDto {
    readonly workers: IEmployWorker[];
    readonly salary: Number;
    readonly totalSalary: number;
}