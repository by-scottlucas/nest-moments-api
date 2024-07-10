import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgetDTO {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: "E-mail utilizado para recuperar senha" })
    email: string;

}