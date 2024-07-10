import { SetMetadata } from "@nestjs/common";
import { UserEnum } from "../enums/user.enum";

export const USERS_KEY = "usuarios";
export const Usuarios = (...usuarios: UserEnum[]) => SetMetadata("usuarios", usuarios);