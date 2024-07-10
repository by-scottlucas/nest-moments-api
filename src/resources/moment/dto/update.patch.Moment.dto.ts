import { PartialType } from "@nestjs/mapped-types";
import { MomentDTO } from "./moment.dto";

export class UpdatePatchMomentDTO extends PartialType(MomentDTO) { }