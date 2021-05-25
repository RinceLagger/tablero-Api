import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TableroModule } from './tablero/tablero.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    TableroModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tableroAPI', {
      useNewUrlParser: true,
    }),
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
