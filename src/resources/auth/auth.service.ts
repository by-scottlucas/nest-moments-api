import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthRegisterDTO } from './dto/auth.register.dto';


@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    createToken(user: UserEntity) {

        return {
            accessToken: this.jwtService.sign({
                sub: user.id,
                name: user.nome,
                email: user.email
            }, {
                expiresIn: "7 days",
                issuer: this.issuer,
                audience: this.audience,
            })
        }

    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });

            return data;

        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;

        } catch (e) {
            return false;
        }

    }

    async login(email: string, senha: string) {

        const usuario = await this.userRepository.findOneBy({ email });

        if (!usuario) {
            throw new UnauthorizedException("E-mail e/ou senha incorretos.");
        }

        if (!await bcrypt.compare(senha, usuario.senha)) {
            throw new UnauthorizedException("E-mail e/ou senha incorretos.");
        }

        const token = await this.createToken(usuario);
        console.log("Token Login => ", token);
        return this.createToken(usuario);

    }

    async register({ nome, email, senha, tipo_usuario }: AuthRegisterDTO) {
        const data: any = { nome, email, senha, tipo_usuario }
        await this.userService.create(data);
    }

    async forget(email: string) {

        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto.');
        }

        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users',
        })

        // Teste de Envio de E-mail
        // this.mailerService.sendMail({
        //     subject: 'Recuperar Senha',
        //     to: 'Suporte@arbor.com',
        //     template: 'forget',
        //     context: {
        //         name: user.nome,
        //         token
        //     }
        // })

        const mailData = {
            to: 'lucassk.santos174@gmail.com',
            from: 'lucasluke307@gmail.com',
            subject: 'Recuperar Senha',
            html: `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Recuperação de Senha</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
              <div
                style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                <h2 style="margin-bottom: 20px;">Recuperação de Senha</h2>
                <p>Olá <span style="font-weight: bold;">${user.nome}</span>,</p>
                <p>Você solicitou a recuperação de senha. Utilize o código abaixo para completar o processo:</p>
                <div style="position: relative;">
                  <p id="token"
                    style="padding: 10px; background-color: #f0f0f0; border-radius: 5px; font-weight: bold; word-wrap: break-word;">
                    ${token}
                    </p>
                </div>
                <p style="margin-top: 20px;">Caso não tenha solicitado essa recuperação, por favor ignore este e-mail.</p>
                <p style="margin-top: 20px;">Atenciosamente,</p>
                <p style="margin-top: 20px; font-style: italic;">Equipe de Suporte Arbor Engine</p>
              </div>
            </body>
            </html>
            `
        }

        // // SendGrid Envio de E-mail
        // this.emailService.send(mailData)
        //     .then(() => {
        //         console.log("E-mail enviado com sucesso!")
        //     })
        //     .catch((error) => {
        //         console.error("Erro ao enviar o e-mail.", error);
        //     });

        return true;

    }

    async reset(senha: string, token: string) {

        try {

            const data: any = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            });

            if (isNaN(Number(data.id))) {
                throw new BadRequestException("Token é invalido.");
            }

            const salt = await bcrypt.genSalt()
            senha = await bcrypt.hash(senha, salt);

            await this.userRepository.update(Number(data.id), {
                senha
            });

            const user = await this.userService.read(Number(data.id))

            return this.createToken(user);

        } catch (e) {
            throw new BadRequestException(e);
        }

    }

}