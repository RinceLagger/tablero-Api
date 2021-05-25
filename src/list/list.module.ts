import { forwardRef, Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schema/list.schema';
import { TableroModule } from 'src/tablero/tablero.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    forwardRef(() => TaskModule),
    forwardRef(() => TableroModule),
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
  ],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
