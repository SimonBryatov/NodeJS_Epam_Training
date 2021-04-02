import express from 'express';

import * as UserController from './controller/controller';
import { errorHandler } from './errors/errorHandler';
import { autoSuggestUserValidator, createUserValidator, updateUserValidator } from './validatiors';

const userRouter = express.Router({ strict: true });

userRouter.get('/:id', UserController.getUser);

userRouter.post('/', createUserValidator, UserController.createUser);

userRouter.patch('/:id', updateUserValidator, UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);

userRouter.get('/loginAutosuggest/', autoSuggestUserValidator, UserController.autoSuggestUser);

userRouter.get('/testGetAll/', UserController.testGetAll);

userRouter.all('*', (req, res) => res.sendStatus(404));

userRouter.use(errorHandler);

export default userRouter;
