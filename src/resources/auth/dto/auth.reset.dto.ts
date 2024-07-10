import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString, MinLength } from "class-validator";

export class AuthResetDTO {

    @IsString()
    @MinLength(6)
    @ApiProperty({ type: String, description: "Nova senha do usuário" })
    senha: string;

    @IsJWT()
    @ApiProperty({ type: String, description: "Token para a redefinição da senha" })
    token: string;

}