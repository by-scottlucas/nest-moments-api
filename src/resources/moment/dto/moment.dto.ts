import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { UserDTO } from "src/resources/user/dto/user.dto";

export class MomentDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Título do Moment" })
    titulo: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: "Data do Moment" })
    data: Date;

    @IsNotEmpty()
    @ApiProperty({ description: "ID do usuário ao qual pertence o moment" })
    id_usuario: UserDTO;

}