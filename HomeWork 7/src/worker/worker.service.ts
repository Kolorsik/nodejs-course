import { Injectable, HttpException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WorkerDto } from '../dto/worker.dto';
import { WorkerWorksDto } from '../dto/workerWorks.dto';
import IWorker from '../interfaces/worker.interface';
import IEmployWorker from '../interfaces/employWorker.interface';
import IWork from '../interfaces/work.interface';

@Injectable()
export class WorkerService {

    constructor(
        @InjectModel('worker') private readonly workerModel: Model<IWorker>,
        @InjectModel('employWorker') private readonly employWorkerModel: Model<IEmployWorker>,
        @InjectModel('work') private readonly workModel: Model<IWork> 
    ) {}

    public async getWorkers(): Promise<WorkerDto[]> {
        const workers: IWorker[] = await this.workerModel.find();
        if (!workers || !workers[0]) {
            throw new HttpException('Workers not found', 404);
        } else {
            return workers;
        }
    }

    public async postWorker(newWorker: WorkerDto): Promise<WorkerDto> {
        if (newWorker.name && typeof (newWorker.name) === 'string') {
            const worker: IWorker = new this.workerModel(newWorker);
            await worker.save();
            return worker;
        } else {
            throw new HttpException('Incorrent parameter(s) in request', 400);
        }
    }

    public async getWorkerById(id: String): Promise<WorkerDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }
        const worker: IWorker = await this.workerModel.findOne({_id: id});
        if (!worker) {
            throw new HttpException('Worker not found', 404);
        } else {
            return worker;
        }
    }

    public async deleteWorker(id: String): Promise<WorkerDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }
        const worker: IWorker = await this.workerModel.findByIdAndDelete(id);
        if (!worker) {
            throw new HttpException('Worker not found', 404);
        } else {
            return worker;
        }
    }

    public async putWorker(id: String, newWorker: WorkerDto): Promise<WorkerDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }

        if (newWorker.name && typeof (newWorker.name) === 'string') {
            const worker: IWorker = await this.workerModel.findOneAndUpdate({_id: id}, newWorker);
            if (!worker) {
                throw new HttpException('Worker not found', 404);
            } else {
                const newWorker: IWorker = await this.workerModel.findOne({_id: id});
                return newWorker;
            }
        } else {
            throw new HttpException('Incorrent parameter(s) in request', 400);
        }
    }

    public async patchWorker(id: String, newWorker: WorkerDto): Promise<WorkerDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }

        if (newWorker.name && typeof (newWorker.name) === 'string') {
            const worker: IWorker = await this.workerModel.findOneAndUpdate({_id: id}, newWorker);
            if (!worker) {
                throw new HttpException('Worker not found', 404);
            } else {
                const newWorker: IWorker = await this.workerModel.findOne({_id: id});
                return newWorker;
            }
        } else {
            throw new HttpException('Incorrent parameter(s) in request', 400);
        }
    }

    public async getWorkerWorks(id: String): Promise<WorkerWorksDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }

        const worker: IWorker = await this.workerModel.findOne({_id: id});
        if (worker) {
            let totalSalary: number = 0;
            const works: IEmployWorker[] = await this.employWorkerModel.find({worker: id}).populate('work');
            for (let work of works) {
                const temp: IWork = <IWork>work.work;
                totalSalary += +temp.salary;
            }
            return {works, totalSalary};
        } else {
            throw new HttpException('Worker not found', 404);
        }
    }

    public async postWorkerWork(idWorker: String, idWork: String): Promise<IEmployWorker> {
        if (!isValidObjectId(idWorker) || !isValidObjectId(idWork)) {
            throw new HttpException('Invalid Id', 400);
        }

        const work: IWork = await this.workModel.findOne({_id: idWork});
        const worker: IWorker = await this.workerModel.findOne({_id: idWorker});

        if (work && worker) {
            let hours: number = 0;
            const works: IEmployWorker[] = await this.employWorkerModel.find({worker: worker._id}).populate('work');

            for (let work of works) {
                const temp: IWork = <IWork>work.work;
                hours += +temp.hoursPerDay;
            }

            if ((hours + +work.hoursPerDay) <= 20) {
                const EmpWorker: IEmployWorker = await this.employWorkerModel.findOne({worker: worker._id, work: work._id});
                if (!EmpWorker) {
                    const employWorker: IEmployWorker = new this.employWorkerModel({worker: worker._id, work: work._id});
                    employWorker.save();
                    return employWorker;
                } else {
                    throw new HttpException('Worker already have this work', 400)
                }
            } else {
                throw new HttpException('Worker works a lot. He wants to get some rest ༼ つ ◕_◕ ༽つ', 200);
            }

        } else {
            if (!worker) {
                throw new HttpException('Worker not found', 404);
            }

            if (!work) {
                throw new HttpException('Work not found', 404);
            }
        }
    }

    public async deleteWorkerWork(idWorker: String, idWork: String): Promise<IEmployWorker> {
        if (!isValidObjectId(idWorker) || !isValidObjectId(idWork)) {
            throw new HttpException('Invalid Id', 400);
        }

        const worker: IWorker = await this.workerModel.findOne({_id: idWorker});
        if (worker) {
            const EmpWorker: IEmployWorker = await this.employWorkerModel.findOne({worker: idWorker, work: idWork});
            if (EmpWorker) {
                const employWorker: IEmployWorker = await this.employWorkerModel.findOneAndDelete({_id: EmpWorker._id});
                return employWorker;
            } else {
                throw new HttpException('Worker does not have this work', 404);
            }
        } else {
            throw new HttpException('Worker not found', 404);
        }
    }
}
