import express from 'express';
import { errorHandler } from './errorHandler';

import userRouter from '../modules/users/infra/routes';

const mainRouter = express.Router();

mainRouter.use('/users', userRouter);

mainRouter.use(errorHandler);

mainRouter.all('*', (req, res) => res.sendStatus(404));

export default mainRouter;
