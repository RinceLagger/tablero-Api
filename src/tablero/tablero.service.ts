import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TableroDocument } from './schema/tablero.schema';
import { TableroDTO } from './dto/tablero.dto';

@Injectable()
export class TableroService {
  constructor(
    @InjectModel('Tablero') private tableroModel: Model<TableroDocument>,
  ) {}

  async createTablero(tablero: TableroDTO): Promise<TableroDocument> {
    const newTablero = new this.tableroModel(tablero);
    return await newTablero.save();
  }

  async getTableros(): Promise<TableroDocument[]> {
    const tableros = await this.tableroModel.find();
    return tableros;
  }

  async getTablero(tableroID: number): Promise<TableroDocument> {
    const tablero = await this.tableroModel.findById(tableroID);
    return tablero;
  }
}
