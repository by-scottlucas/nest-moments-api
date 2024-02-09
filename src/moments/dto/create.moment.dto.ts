import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateMomentDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Título do Moment" })
    titulo: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: "Data do Moment" })
    data: Date;
}