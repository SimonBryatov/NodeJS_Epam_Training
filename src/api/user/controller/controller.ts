import { RequestHandler } from 'express';

import { ApiUserError, API_USER_ERROR_TYPE } from '../errors/apiUserError';
import { UserModel } from '../model/model';
import { RequestBodyCreateUser, RequestBodyUpdateUser } from './types';

const UserStore = new UserModel();

export const getUser: RequestHandler = (req, res) => {
    const { id } = req.params;

    const foundUser = UserStore.findById(id);

    if (!foundUser) {
        throw new ApiUserError(API_USER_ERROR_TYPE.notFound);
    }

    res.json({
        id: foundUser.id,
        login: foundUser.login,
        age: foundUser.age
    });
};

export const createUser: RequestHandler = (req, res) => {
    const { login, password, age } = req.body as RequestBodyCreateUser;

    const alreadyExistingUser = UserStore.findByLogin(login);

    if (alreadyExistingUser) {
        throw new ApiUserError(API_USER_ERROR_TYPE.alreadyExists);
    }

    UserStore.create({
        login,
        password,
        age
    });

    res.sendStatus(200);
};

export const updateUser: RequestHandler = (req, res) => {
    const { id } = req.params;
    const { login, age } = req.body as RequestBodyUpdateUser;

    const foundUser = UserStore.findById(id);

    if (!foundUser) {
        throw new ApiUserError(API_USER_ERROR_TYPE.notFound);
    }

    const loginIsReserved = !!UserStore.findByLogin(login);

    if (loginIsReserved) {
        throw new ApiUserError(API_USER_ERROR_TYPE.alreadyExists);
    }

    const updatedUser = UserStore.update(id, {
        login,
        age
    });

    res.json({
        id: updatedUser.id,
        login: updatedUser.login,
        age: updatedUser.age
    });
};

export const deleteUser: RequestHandler = (req, res) => {
    const { id } = req.params;

    const foundUser = UserStore.findById(id);

    if (!foundUser) {
        throw new ApiUserError(API_USER_ERROR_TYPE.notFound);
    }

    UserStore.remove(id);

    res.sendStatus(200);
};

export const autoSuggestUser: RequestHandler = (req, res) => {
    const { login, limit } = req.query;

    const results = UserStore.autoSuggestByLogin(login as string, +limit);

    res.json({ results });
};

export const testGetAll: RequestHandler = (req, res) => {
    res.json(UserStore.entities);
};
