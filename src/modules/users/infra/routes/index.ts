import express from 'express';

import * as UserController from '../../controller/controller';

import {
    autoSuggestUserValidator,
    createUserValidator,
    deleteUserValidator,
    getUserValidator,
    updateUserValidator
} from '../../validators';

const userRouter = express.Router({ strict: true });

userRouter.get('/:id', getUserValidator, UserController.getUser);

userRouter.post('/', createUserValidator, UserController.createUser);

userRouter.patch('/:id', updateUserValidator, UserController.updateUser);

userRouter.delete('/:id', deleteUserValidator, UserController.deleteUser);

userRouter.get('/loginAutosuggest/', autoSuggestUserValidator, UserController.autoSuggestUser);

userRouter.all('*', (req, res) => res.sendStatus(404));

export default userRouter;
