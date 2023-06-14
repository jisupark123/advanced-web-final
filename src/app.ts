import express from 'express';
import 'dotenv/config';
import nunjucks from 'nunjucks';
import path from 'path';
import cors from 'cors';
import rootRouter from './routes/root';
import ingredientsRouter from './routes/ingredients';
import devRouter from './routes/dev';
import db, { sequelize } from './models/db';
import recipeRouter from './routes/recipe';

const app = express();

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
  express: app,
  watch: true,
});

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', rootRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/dev', devRouter);

app.listen(3001, async () => {
  console.log('express is listening to http://localhost:3001');

  await sequelize
    .authenticate()
    .then(() => console.log('db connect'))
    .catch(console.log);

  // // await db.StoredIngredient.create({
  // //   name: '가지',
  // //   category: '채소',
  // //   storageArea: 'fridge',
  // //   count: 1,
  // //   expirationDate: '2023-06-06 14:50:09.338',
  // //   userId: 3,
  // // });
  // const i = await db.StoredIngredient.findAll({});
  // console.log(i);
});
