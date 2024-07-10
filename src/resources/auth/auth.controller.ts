import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

import { User } from '../../decorators/user.decorator';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth.forget.dto';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { AuthResetDTO } from './dto/auth.reset.dto';

@Controller('api/v1/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @ApiCreatedResponse({ description: 'Cria uma conta do usuário no sistema.' })
  async criarConta(@Body() data: AuthRegisterDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Loga o usuário no sistema.' })
  async entrar(@Body() { email, senha }: AuthLoginDTO) {
    return this.authService.login(email, senha);
  }

  @UseGuards(AuthGuard)
  @Post('perfil')
  @ApiCreatedResponse({ description: 'Exibe as credenciais do usuário cujo token está logado.' })
  async perfil(@User() user, @Req() { tokenPayload }) {
    return { user, tokenPayload };
  }

  @Post('forget')
  @ApiCreatedResponse({ description: 'Realiza o envio de um token para a troca de senha.' })
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  @ApiCreatedResponse({ description: 'Realiza a troca de senha utilizando um token enviado via e-mail.' })
  async reset(@Body() { senha, token }: AuthResetDTO) {
    return this.authService.reset(senha, token);
  }

}
