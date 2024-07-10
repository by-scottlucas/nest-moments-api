import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/enums/role.enum';

export class UserDTO {

    id?:number

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string

    @IsString()
    @IsOptional()
    @IsEnum(RoleEnum)
    tipo_usuario: string;
}