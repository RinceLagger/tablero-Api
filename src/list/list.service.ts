import { Injectable } from '@nestjs/common';
import { ListDocument } from './schema/list.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TableroService } from 'src/tablero/tablero.service';
import { ListDTO } from './dto/list.dto';
import { Task } from 'src/task/schema/task.schema';

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

  async getLists(): Promise<ListDocument[]> | null {
    try {
      const lists = await this.listModel.find();
      return lists;
    } catch (error) {
      return null;
    }
  }

  async getList(listID: number): Promise<ListDocument> | null {
    try {
      const list = await this.listModel.findById(listID);
      return list;
    } catch (error) {
      return null;
    }
  }

  async getTasksList(listID: number): Promise<Task[]> | null {
    try {
      const { tasks } = await this.listModel.findById(listID).populate('tasks');
      return tasks;
    } catch (error) {
      return null;
    }
  }

  async addTask(listID: number, taskID: number): Promise<ListDocument> | null {
    try {
      const list = await this.listModel.findByIdAndUpdate(
        listID,
        {
          $push: { tasks: taskID },
        },
        { new: true },
      );
      return list;
    } catch (error) {
      return null;
    }
  }
}
