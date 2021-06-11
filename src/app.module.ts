import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    LinksModule,
    MongooseModule.forRoot('mongodb://localhost/nest-favorites')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
