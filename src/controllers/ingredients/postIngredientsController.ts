import { Request, Response } from 'express';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';
import db from '../../models/db';
import { isStorageAreaType } from '../../types/storageAreaType';

async function postIngredientsController(req: Request, res: Response<AppResponseType>) {
  const { userId } = req.headers;
  const { name, category, storageArea, count, expirationDate } = req.body;
  if (
    typeof name !== 'string' ||
    typeof category !== 'string' ||
    !isStorageAreaType(storageArea) ||
    typeof count !== 'number' ||
    typeof expirationDate !== 'string'
  ) {
    return res.status(400).json({
      isSuccess: false,
      message: '데이터 형식이 올바르지 않습니다.',
      result: {},
    });
  }
  await db.StoredIngredient.create({ userId: Number(userId), name, category, storageArea, count, expirationDate });
  return res.status(200).json({ isSuccess: true, message: '성공적으로 추가되었습니다.', result: {} });
}

export default withController({ methods: ['POST'], privateMethods: ['POST'], controller: postIngredientsController });
