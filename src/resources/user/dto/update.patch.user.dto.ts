import { PartialType } from "@nestjs/swagger";
import { UserDTO } from "./user.dto";

export class UpdatePatchUserDTO extends PartialType(UserDTO) {}