import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';

function autoLoginController(req: Request, res: Response<AppResponseType>) {
  return res.status(200).json({
    isSuccess: true,
    message: '성공적으로 로그인 되었습니다',
    result: {},
  });
}

export default withController({ methods: ['POST'], privateMethods: ['POST'], controller: autoLoginController });
