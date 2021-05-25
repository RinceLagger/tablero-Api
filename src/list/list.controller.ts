import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

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
}
