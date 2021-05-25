import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Tablero } from 'src/tablero/schema/tablero.schema';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tablero',
    required: true,
  })
  tablero: Tablero;

  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  // tasks: task[];
}

export const ListSchema = SchemaFactory.createForClass(List);
