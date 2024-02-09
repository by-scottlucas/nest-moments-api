import { PartialType } from "@nestjs/mapped-types";
import { CreateMomentDTO } from "./create.moment.dto";

export class UpdatePatchMomentDTO extends PartialType(CreateMomentDTO) { }