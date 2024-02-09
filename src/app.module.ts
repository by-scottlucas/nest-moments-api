import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomentModule } from './moments/moment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MomentEntity } from './moments/entity/moment.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MomentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [MomentEntity],
      synchronize: process.env.ENV === "development",
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
