import { Request, response, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        // recuperando dados do usuario
        const { email, password } = request.body
        const createSessionService = new CreateSessionService()
        const user = await createSessionService.execute({
            email, password
        })
        return response.json(user)
    }
}