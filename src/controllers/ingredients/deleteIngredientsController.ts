import { Request, Response } from 'express';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';
import db from '../../models/db';

async function deleteIngredientsController(req: Request, res: Response<AppResponseType>) {
  const { id } = req.headers;
  if (!id) {
    return res.status(400).json({
      isSuccess: false,
      message: '식재료 ID를 전달받지 못함',
      result: {},
    });
  }
  await db.StoredIngredient.destroy({ where: { id: Number(id) } });
  return res.status(200).json({ isSuccess: true, message: '성공적으로 삭제되었습니다.', result: {} });
}

export default withController({
  methods: ['DELETE'],
  privateMethods: ['DELETE'],
  controller: deleteIngredientsController,
});
