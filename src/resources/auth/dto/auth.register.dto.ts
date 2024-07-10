import { PartialType } from "@nestjs/mapped-types";
import { UserDTO } from "src/resources/user/dto/user.dto";

export class AuthRegisterDTO extends PartialType(UserDTO) { }