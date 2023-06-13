import autoLoginController from '../controllers/root/autoLoginController';
import kakaoLoginController from '../controllers/root/kakaoLoginController';
import loginController from '../controllers/root/loginController';
import { Request, Response, Router } from 'express';

const rootRouter = Router();

rootRouter.post('/login', loginController);
rootRouter.post('/login/kakao', kakaoLoginController);
rootRouter.post('/auto-login', autoLoginController);

export default rootRouter;
