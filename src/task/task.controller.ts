import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(@Res() res: Response, @Body() task: TaskDTO) {
    const taskResponse = await this.taskService.createTask(task);
    if (taskResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(taskResponse);
  }

  @Get()
  async getTasks(@Res() res: Response) {
    const tasksResponse = await this.taskService.getTasks();
    if (tasksResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(tasksResponse);
  }

  @Get(':id')
  async getTask(@Res() res: Response, @Param('id') taskID: number) {
    const taskResponse = await this.taskService.getTask(taskID);
    if (taskResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(taskResponse);
  }
}
