import { Injectable, HttpException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WorkDto } from '../dto/work.dto';
import { WorkWorkersDto } from '../dto/workWorkers.dto';
import IWork from '../interfaces/work.interface';
import IEmployWorker from '../interfaces/employWorker.interface';

@Injectable()
export class WorkService {

    constructor (@InjectModel('work') private readonly workModel: Model<IWork>, @InjectModel('employWorker') private readonly employWorkerModel: Model<IEmployWorker>) {}

    public async getWorks(): Promise<WorkDto[]> {
        const works: IWork[] = await this.workModel.find();
        if (!works || !works[0]) {
            throw new HttpException('Works not found', 404);
        } else {
            return works;
        }
    }

    public async postWork(newWork: WorkDto): Promise<WorkDto> {
        if (newWork.name && newWork.salary && newWork.hoursPerDay && typeof(newWork.name) === 'string' && typeof(newWork.salary) === 'number' && typeof(newWork.hoursPerDay) === 'number') {
            const work: IWork = new this.workModel(newWork);
            await work.save();
            return work;
        } else {
            throw new HttpException('Incorrent parameter(s) in request', 400);
        }
    }

    public async getWorkById(id: String): Promise<WorkDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }

        const work: IWork = await this.workModel.findOne({_id: id});
        if (!work) {
            throw new HttpException('Work not found', 404);
        } else {
            return work;
        }
    }

    public async deleteWork(id: String): Promise<WorkDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }

        const work: IWork = await this.workModel.findByIdAndDelete(id);
        if (!work) {
            throw new HttpException('Work not found', 404);
        } else {
            return work;
        }
    }

    public async putWork(id: String, newWork: WorkDto): Promise<WorkDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 400);
        }
        
        if (newWork.name && newWork.salary && newWork.hoursPerDay && typeof(newWork.name) === 'string' && typeof(newWork.salary) === 'number' && typeof(newWork.hoursPerDay) === 'number') {
            const work: IWork = await this.workModel.findOneAndUpdate({_id: id}, newWork);
            if (!work) {
                throw new HttpException('Work not found', 404);
            } else {
                const newWork: IWork = await this.workModel.findOne({_id: id});
                return newWork;
            }
        } else {
            throw new HttpException('Incorrent parameter(s) in request', 400);
        }
    }

    public async patchWorker(id: String, newWork: WorkDto): Promise<WorkDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Invalid Id', 404);
        }

        if ((newWork.name && typeof (newWork.name) === 'string') || (newWork.salary && typeof (newWork.salary) === 'number') || (newWork.hoursPerDay && typeof (newWork.hoursPerDay) === 'number')) {
            const work: IWork = await this.workModel.findOneAndUpdate({_id: id}, newWork);
            if (!work) {
                throw new HttpException('Work not found', 404);
            } else {
                const newWork: IWork = await this.workModel.findOne({_id: id});
                return newWork;
            }
        } else {
            throw new HttpException('Incorrent parameter(s) in request', 400);
        }
    }

    public async getWorkWorkers(id: String): Promise<WorkWorkersDto> {
        if (!isValidObjectId(id)) {
            throw new HttpException('Work not found', 404);
        }

        const work: IWork = await this.workModel.findOne({_id: id});

        if (work) {
            const workers: IEmployWorker[] = await this.employWorkerModel.find({work: id}).populate('worker');
            return {workers, salary: work.salary, totalSalary: +work.salary * workers.length};
        } else {
            throw new HttpException('Work not found', 404);
        }
    }

    public async deleteWorkWorker(idWork: String, idWorker: String): Promise<IEmployWorker> {
        if (!isValidObjectId(idWork) || !isValidObjectId(idWork)) {
            throw new HttpException('Invalid id', 400);
        }

        const work: IWork = await this.workModel.findOne({_id: idWork});

        if (work) {
            const EmpWorker: IEmployWorker = await this.employWorkerModel.findOne({worker: idWorker, work: idWork});
            if (EmpWorker) {
                const EmpWorkerDel: IEmployWorker = await this.employWorkerModel.findOneAndDelete({_id: EmpWorker._id});
                if (!EmpWorkerDel) {
                    throw new HttpException('Work with worker not found', 404);
                } else {
                    return EmpWorkerDel;
                }
            } else {
                throw new HttpException('Worker not found', 404);
            }
        } else {
            throw new HttpException('Work not found', 404);
        }
    }
}
