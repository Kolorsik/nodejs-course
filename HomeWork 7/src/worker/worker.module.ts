import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { workerSchema } from '../schemas/worker.schema';
import { workSchema } from '../schemas/work.schema';
import { employWorkerSchema } from '../schemas/employWorker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'worker',
        schema: workerSchema
      },
      {
        name: 'work',
        schema: workSchema
      },
      {
        name: 'employWorker',
        schema: employWorkerSchema
      }
    ]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService]
})
export class WorkerModule {}
