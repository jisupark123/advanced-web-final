import { Request, Response } from 'express';
import withController from '../../lib/withController';
import AppResponseType from '../../types/appResponseType';
import db from '../../models/db';

async function getIngredientsController(req: Request, res: Response<AppResponseType>) {
  const { userId } = req.headers;
  const ingredients = await db.StoredIngredient.findAll({ where: { userId: Number(userId) } });

  const ingredientsResponse = ingredients.map((ingredient) => {
    const { id, name, category, storageArea, count, expirationDate } = ingredient;
    return { id, name, category, storageArea, count, expirationDate };
  });

  const categories: string[] = [];
  ingredientsResponse.forEach((ingredient) => {
    if (!categories.includes(ingredient.category)) {
      categories.push(ingredient.category);
    }
  });

  res.status(200).json({
    isSuccess: true,
    message: '성공적으로 조회되었습니다.',
    result: {
      categories,
      ingredients: ingredientsResponse,
    },
  });
}

export default withController({ methods: ['GET'], privateMethods: ['GET'], controller: getIngredientsController });
