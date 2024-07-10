import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { MomentEntity } from './entity/moment.entity';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MomentEntity,
            UserEntity
        ]),
        forwardRef(() =>  AuthModule),
        forwardRef(() => UserModule),
    ],
    providers: [MomentService],
    exports: [MomentService],
    controllers: [MomentController]
})
export class MomentModule { }