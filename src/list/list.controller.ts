import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { ListService } from './list.service';
import { Response } from 'express';
import { ListDTO } from './dto/list.dto';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post('create')
  async createList(@Res() res: Response, @Body() list: ListDTO) {
    const listResponse = await this.listService.createList(list);
    if (listResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(listResponse);
  }

  @Get()
  async getLists(@Res() res: Response) {
    const listsResponse = await this.listService.getLists();
    if (listsResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(listsResponse);
  }

  @Get(':id')
  async getList(@Res() res: Response, @Param('id') listID: number) {
    const listResponse = await this.listService.getList(listID);
    if (listResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(listResponse);
  }

  @Get(':id/tasks')
  async getListsTablero(@Res() res: Response, @Param('id') listID: number) {
    const tasksList = await this.listService.getTasksList(listID);
    if (tasksList === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(tasksList);
  }
}
