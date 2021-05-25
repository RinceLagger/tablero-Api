import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tablero, TableroDocument } from './schema/tablero.schema';
import { TableroDTO } from './dto/tablero.dto';
import { List } from 'src/list/schema/list.schema';
import { ListService } from 'src/list/list.service';

@Injectable()
export class TableroService {
  constructor(
    @InjectModel('Tablero') private tableroModel: Model<TableroDocument>,
    @Inject(forwardRef(() => ListService))
    private listService: ListService,
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

  async getListasTablero(tableroID: number): Promise<List[]> | null {
    try {
      const { lists } = await this.tableroModel
        .findById(tableroID)
        .populate('lists');
      return lists;
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

  async deleteListFromTablero(
    tableroID: Tablero,
    listID: number,
  ): Promise<void> | null {
    try {
      await this.tableroModel.findByIdAndUpdate(
        tableroID,
        {
          $pull: { lists: listID },
        },
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }

  async deleteTablero(tableroID: number): Promise<void> | null {
    try {
      const { lists } = await this.tableroModel
        .findById(tableroID)
        .populate('lists');
      await this.tableroModel.findOneAndDelete({ _id: tableroID });
      await this.listService.deleteListArray(lists);
    } catch (error) {
      return null;
    }
  }
}
