import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { WorkerService } from './worker.service';
import IEmployWorker from '../interfaces/employWorker.interface';
import { WorkerDto } from '../dto/worker.dto';
import { WorkerWorksDto } from '../dto/workerWorks.dto';

@Controller('api/workers')
export class WorkerController {

    constructor (private workerService: WorkerService) {}

    @Get()
    async getWorkers(): Promise<WorkerDto[]> {
        return this.workerService.getWorkers();
    }

    @Get(':id')
    async getWorkerById(@Param('id') id: String): Promise<WorkerDto> {
        return this.workerService.getWorkerById(id);
    }

    @Get(':id/works')
    async getWorkerWorks(@Param('id') id: String): Promise<WorkerWorksDto> {
        return this.workerService.getWorkerWorks(id);
    }

    @Post()
    async postWorker(@Body() worker: WorkerDto): Promise<WorkerDto> {
        return this.workerService.postWorker(worker);
    }

    @Post(':idWorker/:idWork')
    async postWorkerWork(@Param('idWorker') idWorker: String, @Param('idWork') idWork: String): Promise<IEmployWorker> {
        return this.workerService.postWorkerWork(idWorker, idWork);
    }

    @Put(':id')
    async putWorker(@Param('id') id: String, @Body() worker: WorkerDto): Promise<WorkerDto> {
        return this.workerService.putWorker(id, worker);
    }

    @Patch(':id')
    async patchWorker(@Param('id') id: String, @Body() worker: WorkerDto): Promise<WorkerDto> {
        return this.workerService.patchWorker(id, worker);
    }

    @Delete(':id')
    async deleteWorker(@Param('id') id: String): Promise<WorkerDto> {
        return this.workerService.deleteWorker(id);
    }

    @Delete(':idWorker/:idWork')
    async deleteWorkerWork(@Param('idWorker') idWorker: String, @Param('idWork') idWork: String): Promise<IEmployWorker> {
        return this.workerService.deleteWorkerWork(idWorker, idWork);
    }
}
