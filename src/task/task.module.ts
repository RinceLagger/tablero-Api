import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from 'src/list/list.module';
import { TaskSchema } from './schema/task.schema';

@Module({
  imports: [
    ListModule,
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
