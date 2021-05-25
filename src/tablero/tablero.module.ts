import { forwardRef, Module } from '@nestjs/common';
import { TableroService } from './tablero.service';
import { TableroController } from './tablero.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableroSchema } from './schema/tablero.schema';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [
    forwardRef(() => ListModule),
    MongooseModule.forFeature([{ name: 'Tablero', schema: TableroSchema }]),
  ],
  providers: [TableroService],
  controllers: [TableroController],
  exports: [TableroService],
})
export class TableroModule {}
