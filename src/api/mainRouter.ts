import express from 'express';

import userRouter from './user/router';

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);

mainRouter.all('*', (req, res) => res.sendStatus(404));

export default mainRouter;
