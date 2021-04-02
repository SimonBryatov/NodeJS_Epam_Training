import { v4 as uuidv4 } from 'uuid';

import { CreateUserParams, UpdateUserParams, User } from './types';
import { defaultState } from './_defaultState';

export class UserModel {
    entities: User[] = defaultState;

    create({ login, password, age }: CreateUserParams) {
        // TODO-Improvement: uuidv4 collision detection
        const newUser = {
            id: uuidv4(),
            login,
            password,
            age,
            isDeleted: false
        };
        this.entities.push(newUser);
    }

    update(id: string, updateParams: UpdateUserParams) {
        const userToUpdateIndex = this.entities.findIndex((user) => user.id === id);

        if (userToUpdateIndex !== -1) {
            return Object.assign(this.entities[userToUpdateIndex], updateParams);
        }
    }

    remove(id: string) {
        const userToDeleteIndex = this.entities.findIndex((user) => user.id === id);

        if (userToDeleteIndex !== -1) {
            this.entities[userToDeleteIndex].isDeleted = true;
            return true;
        }
        return false;
    }

    findById(id: string) {
        return this.entities.find((user) => !user.isDeleted && user.id === id);
    }

    findByLogin(login: string) {
        return this.entities.find((user) => !user.isDeleted && user.login === login);
    }

    autoSuggestByLogin(login: string, limit = 1) {
        return this.entities
            .filter((user) => !user.isDeleted && user.login.includes(login))
            .map((user) => user.login)
            .slice(0, limit)
            .sort();
    }
}
