import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TableroDocument = Tablero & Document;

@Schema()
export class Tablero {
  @Prop({ required: true })
  name: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lista' })
  // lista: Lista;
}

export const TableroSchema = SchemaFactory.createForClass(Tablero);
