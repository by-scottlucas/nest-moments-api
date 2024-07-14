import { Body, Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
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
  @ApiCreatedResponse({ description: 'Cria uma conta de usuário no sistema.' })
  async criarConta(@Body() data: AuthRegisterDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Loga o usuário no sistema.' })
  async entrar(@Body() { email, senha }: AuthLoginDTO, @Session() session: Record<string, any>) {
    const token = await this.authService.login(email, senha);
    session.jwt = token.accessToken;
    return token;
  }

  @Post('logout')
  @ApiCreatedResponse({ description: 'Desloga o usuário no sistema.' })
  async sair(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      if (err) {
        throw new Error('Falha ao destruir a sessão');
      }
    });
    return { message: 'Deslogado com Sucesso' };
  }

  @Get('get-session')
  async getSession(@Session() session: Record<string, any>) {
    if (session && session.jwt) {
      return { token: session.jwt };
    } else {
      return { message: 'Nenhuma sessão ativa encontrada.' };
    }
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  @ApiCreatedResponse({ description: 'Exibe as credenciais do usuário cujo token está logado.' })
  async perfil(@User() user, @Req() req: any) {
    return { user, tokenPayload: req.session.jwt };
  }

  @Post('forget')
  @ApiCreatedResponse({ description: 'Realiza o envio de um token via e-mail para a troca de senha.' })
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  @ApiCreatedResponse({ description: 'Realiza a troca de senha utilizando o token enviado via e-mail.' })
  async reset(@Body() { senha, token }: AuthResetDTO) {
    return this.authService.reset(senha, token);
  }

}
