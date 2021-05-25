import { Module } from '@nestjs/common';
import { TableroService } from './tablero.service';
import { TableroController } from './tablero.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableroSchema } from './schema/tablero.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tablero', schema: TableroSchema }]),
  ],
  providers: [TableroService],
  controllers: [TableroController],
  exports: [TableroService],
})
export class TableroModule {}
