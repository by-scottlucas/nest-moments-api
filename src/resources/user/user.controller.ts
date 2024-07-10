import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Patch,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { join } from 'path';
import { ParamId } from 'src/decorators/param.id.decorator';

import { UpdatePatchUserDTO } from './dto/update.patch.user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

import * as fs from 'fs';
import { createReadStream } from 'fs';

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

  @Get('imagens/:id')
  @Header('Content-Type', 'image/png')
  exibirPhotoUsuario(@ParamId() id: number, @Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), `storage/usuarios/${id}.png`));
    return new StreamableFile(file);
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