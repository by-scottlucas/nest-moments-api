import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UpdatePatchUserDTO } from './dto/update.patch.user.dto';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {

    private issuer = 'login';
    private audience = 'users';

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) { }

    async list() {
        return this.userRepository.find();
    }

    async create(data: UserDTO) {

        if (await this.userRepository.exists({ where: { email: data.email } })) {
            throw new BadRequestException("E-mail já cadastrado.")
        }

        const salt = await bcrypt.genSalt();
        data.senha = await bcrypt.hash(data.senha, salt);

        const dados = this.userRepository.create(data);

        return this.userRepository.save(dados);
    }

    async read(id: number) {

        await this.exists(id);
        return this.userRepository.findOne({ where: { id } });

    }

    async update(id: number, { nome, email, senha, tipo_usuario }: UpdatePatchUserDTO) {

        await this.exists(id);

        const data: any = {};

        if (nome) {
            data.nome = nome;
        }

        if (email) {
            data.email = email;
        }

        if (senha) {
            const salt = await bcrypt.genSalt()
            data.senha = await bcrypt.hash(senha, salt);
        }

        if (tipo_usuario) {
            data.tipo_usuario = tipo_usuario;
        }

        await this.userRepository.update(id, data);

        const user = await this.userRepository.findOneBy({ id });
        const novoToken = this.createToken(user);

        console.log("Novo Token", novoToken);

        this.read(id);

        return { novoToken };

    }

    async delete(id: number) {
        await this.exists(id);
        return this.userRepository.delete(id);
    }

    private async exists(id: number) {
        if (!await this.userRepository.exists({ where: { id } })) {
            throw new NotFoundException("Usuário não encontrado.")
        }
    }

    private createToken(user: UserEntity) {

        return {
            updateToken: this.jwtService.sign({
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

    private checkToken(token: string) {
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

    private async isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;

        } catch (e) {
            return false;
        }

    }

}