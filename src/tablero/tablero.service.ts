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

  async createTablero(tablero: TableroDTO): Promise<TableroDocument> | null {
    try {
      const newTablero = new this.tableroModel(tablero);
      return await newTablero.save();
    } catch (error) {
      return null;
    }
  }

  async getTableros(): Promise<TableroDocument[]> | null {
    try {
      const tableros = await this.tableroModel.find();
      return tableros;
    } catch (error) {
      return null;
    }
  }

  async getTablero(tableroID: number): Promise<TableroDocument> | null {
    try {
      const tablero = await this.tableroModel.findById(tableroID);
      return tablero;
    } catch (error) {
      return null;
    }
  }

  async addList(
    tableroID: number,
    listID: number,
  ): Promise<TableroDocument> | null {
    try {
      const tablero = await this.tableroModel.findByIdAndUpdate(
        tableroID,
        {
          $push: { lists: listID },
        },
        { new: true },
      );
      return tablero;
    } catch (error) {
      return null;
    }
  }
}