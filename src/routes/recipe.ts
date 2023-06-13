import { Router } from 'express';
import recipeController from '../controllers/recipe/recipeController';

const recipeRouter = Router();

recipeRouter.get('/', recipeController);

export default recipeRouter;
