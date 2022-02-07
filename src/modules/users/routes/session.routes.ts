import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controllers/SessionController';

// rota de sessao
const sessionRouter = Router()
// controller de sessao
const sessionController = new SessionController()

sessionRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }), sessionController.create,
)
export default sessionRouter