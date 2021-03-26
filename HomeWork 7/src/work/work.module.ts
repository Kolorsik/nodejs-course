import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { workSchema } from '../schemas/work.schema';
import { employWorkerSchema } from '../schemas/employWorker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'employWorker',
        schema: employWorkerSchema
      },
      {
        name: 'work',
        schema: workSchema
      },
    ]),
  ],
  controllers: [WorkController],
  providers: [WorkService]
})
export class WorkModule {}
