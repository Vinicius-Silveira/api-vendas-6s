// responsável por gerar um token para o usuário
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repository/UserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

// criando um tipo de dado de requisição
interface IRequest {
    email: string;
    password: string
}

// criando um tipo de dado de resposta
interface IResponse {
    user: User;
    token: string
}

class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // recuperando o repositório de User
        const userRepository = getCustomRepository(UserRepository)
        const user = await userRepository.findByEmail(email)
        // verificando se o usuário existe
        if (!user) {
            throw new AppError('Email / Senha inválidos', 401);
        }
        // verificando se a senha confere
        const senhaConfirmada = await compare(password, user.password)
        if (!senhaConfirmada) {
            throw new AppError('Email / Senha inválidos', 401);
        }
        // gerando o token
        const token = sign({}, "querty123456789", {
            subject: user.id,
            expiresIn: '1d'
        })
        // retornando resultado
        return {
            user,
            token
        }
    }
}

export default CreateSessionService