import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserEnum } from "src/enums/user.enum";

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
    @IsEnum(UserEnum)
    tipo_usuario: string;
}