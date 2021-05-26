import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { List, ListDocument } from './schema/list.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TableroService } from 'src/tablero/tablero.service';
import { ListDTO } from './dto/list.dto';
import { Task } from 'src/task/schema/task.schema';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class ListService {
  constructor(
    @InjectModel('List') private listModel: Model<ListDocument>,
    @Inject(forwardRef(() => TableroService))
    private tableroService: TableroService,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
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

  async deleteTaskFromList(listID: List, taskID: number): Promise<void> | null {
    try {
      await this.listModel.findByIdAndUpdate(
        listID,
        {
          $pull: { tasks: taskID },
        },
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }

  async deleteList(listID: number): Promise<void> | null {
    try {
      const { tasks, tablero } = await this.listModel.findById(listID);
      await this.listModel.findOneAndDelete({ _id: listID });
      await this.taskService.deleteTaskArray(tasks);
      await this.tableroService.deleteListFromTablero(tablero, listID);
    } catch (error) {
      return null;
    }
  }

  async deleteListArray(lists: List[]) {
    //console.log(lists);
    try {
      lists.forEach(async (list) => {
        await this.taskService.deleteTaskArray(list.tasks);
        await this.listModel.findOneAndDelete({ _id: list['_id'] });
      });
      // await this.listModel.deleteMany({ _id: { $in: lists } });
    } catch (error) {
      console.error(error);
    }
  }

  async updateList(updateList): Promise<ListDocument> | null {
    try {
      const oldList = await this.listModel.findById(updateList.listID);
      const updatedList = Object.assign(oldList, updateList.list);
      return await this.listModel.findOneAndUpdate(
        { _id: updateList['listID'] },
        updatedList,
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }

  async changeTaskToOtherList(oldTask: Task, newListID: List) {
    try {
      const oldListID = oldTask.list;
      const taskID = oldTask['_id'];
      await this.listModel.findByIdAndUpdate(
        oldListID,
        {
          $pull: { tasks: taskID },
        },
        { new: true },
      );
      await this.listModel.findByIdAndUpdate(
        newListID,
        {
          $push: { tasks: taskID },
        },
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }
}
