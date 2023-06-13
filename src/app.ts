import express from 'express';
import 'dotenv/config';
import nunjucks from 'nunjucks';
import path from 'path';
import rootRouter from './routes/root';
import ingredientsRouter from './routes/ingredients';

const app = express();

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
  express: app,
  watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', rootRouter);
app.use('/api/ingredients', ingredientsRouter);

app.listen(3000, () => {
  console.log('listening to http://localhost:3000');
});
