import { Injectable } from '@nestjs/common';
import { ListDocument } from './schema/list.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TableroService } from 'src/tablero/tablero.service';
import { ListDTO } from './dto/list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectModel('List') private listModel: Model<ListDocument>,
    private tableroService: TableroService,
  ) {}

  async createList(list: ListDTO): Promise<ListDocument> | null {
    try {
      const tableroID = list.tablero;
      const newList = new this.listModel(list);
      this.tableroService.addList(tableroID, newList.id);
      return await newList.save();
    } catch (error) {
      return null;
    }
  }
}
