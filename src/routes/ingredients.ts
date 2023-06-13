import getIngredientsController from '../controllers/ingredients/getIngredientsController';
import { Request, Response, Router } from 'express';

const ingredientsRouter = Router();

ingredientsRouter.get('/', getIngredientsController);

export default ingredientsRouter;
