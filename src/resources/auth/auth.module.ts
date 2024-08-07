import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MomentModule } from '../moment/moment.module';

@Module({
    imports: [
        JwtModule.register({ secret: String(process.env.JWT_SECRET) }),
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => UserModule),
        forwardRef(() => MomentModule),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }