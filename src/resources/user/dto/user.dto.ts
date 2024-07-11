import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/enums/role.enum';

export class UserDTO {

    id?: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Nome do Usuário" })
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: "E-mail do Usuário" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ description: "Senha do Usuário" })
    senha: string

    @IsString()
    @IsOptional()
    @IsEnum(RoleEnum)
    @ApiProperty({ description: "Tipo do Usuário podendo ser 'Usuário' ou 'Admin'" })
    tipo_usuario: string;

}