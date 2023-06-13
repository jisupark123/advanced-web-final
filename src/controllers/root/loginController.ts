import { Request, Response } from 'express';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';

function loginController(req: Request, res: Response<AppResponseType>) {
  return res.json({ isSuccess: true, message: '', result: { ok: true } });
}

export default withController({ methods: ['GET'], controller: loginController });
