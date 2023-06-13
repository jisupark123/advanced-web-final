import loginController from '../controllers/root/loginController';
import { Request, Response, Router } from 'express';

const rootRouter = Router();

rootRouter.get('/login', loginController);

export default rootRouter;
