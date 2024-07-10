import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { MomentEntity } from './resources/moment/entity/moment.entity';
import { MomentModule } from './resources/moment/moment.module';
import { UserEntity } from './resources/user/entity/user.entity';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => MomentModule),
    forwardRef(() => UserModule),
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
