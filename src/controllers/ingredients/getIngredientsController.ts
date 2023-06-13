import { Request, Response } from 'express';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';

function getIngredientsController(req: Request, res: Response<AppResponseType>) {
  return res.json({ isSuccess: true, message: '', result: { ok: true } });
}

export default withController({ methods: ['GET'], controller: getIngredientsController });
