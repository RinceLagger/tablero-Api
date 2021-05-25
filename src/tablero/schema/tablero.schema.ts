import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { List } from 'src/list/schema/list.schema';

export type TableroDocument = Tablero & Document;

@Schema()
export class Tablero {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }] })
  lists: List[];
}

export const TableroSchema = SchemaFactory.createForClass(Tablero);
