import { PartialType } from "@nestjs/swagger";
import { UserDTO } from "../../user/dto/user.dto";

export class AuthLoginDTO extends PartialType(UserDTO) {}