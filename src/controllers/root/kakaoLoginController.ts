import { Request, Response } from 'express';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';

function kakaoLoginController(req: Request, res: Response<AppResponseType>) {
  return res.json({ isSuccess: true, message: 'kakao', result: { ok: true } });
}

export default withController({ methods: ['POST'], controller: kakaoLoginController });
