import { Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://<Username>:<Password>@<Cluster address>/<DB name>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}),
    WorkerModule,
    WorkModule
  ]
})
export class AppModule {}
