import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schema/list.schema';
import { TableroModule } from 'src/tablero/tablero.module';

@Module({
  imports: [
    TableroModule,
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
