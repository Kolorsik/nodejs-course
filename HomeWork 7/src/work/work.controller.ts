import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkDto } from '../dto/work.dto';
import { WorkWorkersDto } from '../dto/workWorkers.dto';
import IEmployWorker from '../interfaces/employWorker.interface';

@Controller('api/works')
export class WorkController {

    constructor (private workService: WorkService) {}

    @Get()
    async getWorkers(): Promise<WorkDto[]> {
        return this.workService.getWorks();
    }

    @Get(':id')
    async getWorkById(@Param('id') id: String): Promise<WorkDto> {
        return this.workService.getWorkById(id);
    }

    @Get(':id/workers')
    async getWorkWorkers(@Param('id') id: String): Promise<WorkWorkersDto> {
        return this.workService.getWorkWorkers(id);
    }

    @Post()
    async postWork(@Body() work: WorkDto): Promise<WorkDto> {
        return this.workService.postWork(work);
    }

    @Put(':id')
    async putWork(@Param('id') id: String, @Body() work: WorkDto): Promise<WorkDto> {
        return this.workService.putWork(id, work);
    }

    @Patch(':id')
    async patchWork(@Param('id') id: String, @Body() work: WorkDto): Promise<WorkDto> {
        return this.workService.patchWorker(id, work);
    }

    @Delete(':id')
    async deleteWork(@Param('id') id: String): Promise<WorkDto> {
        return this.workService.deleteWork(id);
    }

    @Delete(':idWork/:idWorker')
    async deleteWorkWorker(@Param('idWork') idWork: String, @Param('idWorker') idWorker: String): Promise<IEmployWorker> {
        return this.workService.deleteWorkWorker(idWork, idWorker);
    }
}