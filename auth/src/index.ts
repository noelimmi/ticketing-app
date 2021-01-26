import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());

//Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//Non Handled Routes
app.all('*', () => {
  throw new NotFoundError();
});

//Error Handler
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} !!!!!!`);
});
