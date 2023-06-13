import { Request, Response, Router } from 'express';
import postIngredientsController from '../controllers/ingredients/postIngredientsController';
import getIngredientsController from '../controllers/ingredients/getIngredientsController';
import putIngredientsController from '../controllers/ingredients/putIngredientsController';
import deleteIngredientsController from '../controllers/ingredients/deleteIngredientsController';

const ingredientsRouter = Router();

ingredientsRouter
  .route('/')
  .get(getIngredientsController)
  .post(postIngredientsController)
  .put(putIngredientsController)
  .delete(deleteIngredientsController);

export default ingredientsRouter;
