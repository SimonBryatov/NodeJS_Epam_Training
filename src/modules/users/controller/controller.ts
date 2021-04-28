import { RequestHandler } from 'express';

import { fromRawToLoginSuggestResults, fromRawToUserData } from '../mappers';
import { User } from '../model';
import { UserRepository } from '../repository';
import { UserHook } from './helpers';
import { RequestBodyCreateUser, RequestBodyUpdateUser } from './types';

export const getUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const userRepo = new UserRepository(User);
    const userHook = new UserHook(userRepo);

    const userRecord = await userHook.findById(id);

    res.json(fromRawToUserData(userRecord));
};

export const createUser: RequestHandler = async (req, res) => {
    const { login, password, age } = req.body as RequestBodyCreateUser;
    const userRepo = new UserRepository(User);
    const userHook = new UserHook(userRepo);

    await userHook.checkForExistingLogin(login);

    const newUserRecord = await userRepo.create({
        login,
        password,
        age
    });

    res.status(201).json(fromRawToUserData(newUserRecord));
};

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { login, age } = req.body as RequestBodyUpdateUser;
    const userRepo = new UserRepository(User);
    const userHook = new UserHook(userRepo);

    await userHook.findById(id);
    await userHook.checkForExistingLogin(login);

    await userRepo.update(id, {
        login,
        age
    });

    res.status(200).json({ id, login, age });
};

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const userRepo = new UserRepository(User);
    const userHook = new UserHook(userRepo);

    await userHook.findById(id);

    await userRepo.remove(id);

    res.sendStatus(200);
};

export const autoSuggestUser: RequestHandler = async (req, res) => {
    const { login, limit } = req.query;
    const userRepo = new UserRepository(User);

    const records = await userRepo.getAllByLogin(login as string, +limit);

    res.json({ results: fromRawToLoginSuggestResults(records) });
};
