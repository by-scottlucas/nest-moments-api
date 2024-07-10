import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { ParamId } from 'src/decorators/param.id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

import { UpdatePatchUserDTO } from './dto/update.patch.user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Roles(RoleEnum.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('api/v1/users')
export class UserController {

  constructor(
    private userService: UserService,
  ) { }

  @Get()
  @ApiOkResponse({ description: "Lista os usuários no Sistema" })
  async listarUsuarios() {
    return this.userService.list();
  }

  @Post()
  @ApiCreatedResponse({ description: "Adiciona um usuário ao sistema" })
  async adicionarUsuario(@Body() usuario: UserDTO) {
    return this.userService.create(usuario);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Lista um único usuário no sistema" })
  async listarUsuario(@ParamId("id") id: number) {
    return this.userService.read(id);
  }

  @Put(":id")
  @ApiCreatedResponse({ description: "Atualiza os dados de um usuário no sistema" })
  async atualizarUsuario(@ParamId("id") id: number, @Body() usuario: UserDTO) {
    return this.userService.update(id, usuario);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Atualiza os dados de um usuário no sistema" })
  async atualizarParcialmenteUsuario(@ParamId("id") id: number, @Body() usuario: UpdatePatchUserDTO) {
    return this.userService.updatePartial(id, usuario);
  }

  @Delete(":id")
  @ApiNoContentResponse({ description: "Exclui um usuário do sistema" })
  async excluirUsuario(@ParamId("id") id: number) {
    return this.userService.delete(id);
  }
}
