import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomentModule } from './resources/moment/moment.module';
import { MomentEntity } from './resources/moment/entity/moment.entity';
import { UserEntity } from './resources/user/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => MomentModule),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        MomentEntity
      ],
      synchronize: process.env.ENV === "development",
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
