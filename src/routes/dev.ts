import kakaoLoginController from '../controllers/root/kakaoLoginController';
import loginController from '../controllers/root/loginController';
import { Request, Response, Router } from 'express';
import jwtController from '../controllers/dev/jwt';

const devRouter = Router();

devRouter.get('/jwt', jwtController);

export default devRouter;
