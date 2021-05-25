import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { TableroService } from './tablero.service';
import { Response } from 'express';
import { TableroDTO } from './dto/tablero.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('tablero')
export class TableroController {
  constructor(private tableroService: TableroService) {}

  @Post('create')
  async createTablero(@Res() res: Response, @Body() tablero: TableroDTO) {
    const tableroResponse = await this.tableroService.createTablero(tablero);
    if (tableroResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(tableroResponse);
  }

  @Get()
  async getTableros(@Res() res: Response) {
    const tablerosResponse = await this.tableroService.getTableros();
    if (tablerosResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(tablerosResponse);
  }

  @Get(':id')
  async getTablero(@Res() res: Response, @Param('id') tableroID: number) {
    const tableroResponse = await this.tableroService.getTablero(tableroID);
    if (tableroResponse === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(tableroResponse);
  }

  @Get(':id/lists')
  async getListasTablero(@Res() res: Response, @Param('id') tableroID: number) {
    const listsTablero = await this.tableroService.getListasTablero(tableroID);
    if (listsTablero === null) {
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
    return res.status(HttpStatus.OK).json(listsTablero);
  }

  @Delete(':id')
  async deleteTablero(@Res() res: Response, @Param('id') tableroID: number) {
    await this.tableroService.deleteTablero(tableroID);

    return res.status(HttpStatus.OK).json();
  }
}
