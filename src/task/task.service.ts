import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ListService } from 'src/list/list.service';
import { TaskDocument } from './schema/task.schema';
import { TaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private taskModel: Model<TaskDocument>,
    private listService: ListService,
  ) {}

  async createTask(task: TaskDTO): Promise<TaskDocument> | null {
    try {
      const listID = task.list;
      const newTask = new this.taskModel(task);
      this.listService.addTask(listID, newTask.id);
      return await newTask.save();
    } catch (error) {
      return null;
    }
  }

  async getTasks(): Promise<TaskDocument[]> | null {
    try {
      const tasks = await this.taskModel.find();
      return tasks;
    } catch (error) {
      return null;
    }
  }

  async getTask(listID: number): Promise<TaskDocument> | null {
    try {
      const task = await this.taskModel.findById(listID);
      return task;
    } catch (error) {
      return null;
    }
  }
}
