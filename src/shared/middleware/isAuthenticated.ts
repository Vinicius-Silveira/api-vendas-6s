import AppError from '../../shared/errors/AppError';
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

// verificando se o usuario tem um token valido
export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    // recuperando o cabeçalho da requisicao contendo a autorizacao
    const authHeader = request.headers.authorization
    if (!authHeader) {
        throw new AppError('Token JWT inválido')
    }
    const [, token] = authHeader.split(' ') // separa em 2 pois somente o segundo nos interessa

    // verificando se o token e valido
    try {
        const tokenVerificado = verify(token, 'querty123456789')
        return next() // pode acessar a API
    } catch {
        throw new AppError('Token JWT inválido')
    }
}