import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ListService } from 'src/list/list.service';
import { Task, TaskDocument } from './schema/task.schema';
import { TaskDTO } from './dto/task.dto';
import { List } from 'src/list/schema/list.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private taskModel: Model<TaskDocument>,
    @Inject(forwardRef(() => ListService))
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

  async getTask(taskID: number): Promise<TaskDocument> | null {
    try {
      const task = await this.taskModel.findById(taskID);
      return task;
    } catch (error) {
      return null;
    }
  }

  async deleteTask(taskID: number): Promise<void> | null {
    try {
      const { list } = await this.taskModel.findById(taskID);
      await this.taskModel.findOneAndDelete({ _id: taskID });
      await this.listService.deleteTaskFromList(list, taskID);
    } catch (error) {
      return null;
    }
  }

  async deleteTaskArray(tasks: Task[]) {
    console.log(tasks);
    await this.taskModel.deleteMany({ _id: { $in: tasks } });
  }

  async updateTask(updateTask): Promise<TaskDocument> | null {
    try {
      const oldTask = await this.taskModel.findById(updateTask.taskID);
      const updatedTask = Object.assign(oldTask, updateTask.task);
      return await this.taskModel.findOneAndUpdate(
        { _id: updateTask['taskID'] },
        updatedTask,
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }

  async changeTaskList(newData: { taskID: number; newListID: List }) {
    try {
      const oldTask = await this.taskModel.findById(newData.taskID);
      await this.listService.changeTaskToOtherList(oldTask, newData.newListID);
      return await this.taskModel.findByIdAndUpdate(
        newData['taskID'],
        { list: newData['newListID'] },
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }
}
