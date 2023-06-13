import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';
import db from '../../models/db';

function makeJwtToken(payload: string | object, privateKey: string) {
  const jwtToken = jwt.sign(payload, privateKey, { expiresIn: '30d' });
  return jwtToken;
}

async function jwtController(req: Request, res: Response<AppResponseType>) {
  const { id } = req.query;
  const user = await db.User.findOne({ where: { id: Number(id) } });
  if (!user) {
    return res.status(400).json({ isSuccess: false, message: '존재하지 않는 ID', result: {} });
  }
  return res.status(200).json({
    isSuccess: true,
    message: 'jwt 생성 성공',
    result: {
      userId: user.id,
      jwt: makeJwtToken({ userId: id }, process.env.JWT_PRIVATE_KEY as string),
    },
  });
}

export default withController({ methods: ['GET'], controller: jwtController });
