import dotenv from 'dotenv';
dotenv.config();

import { User } from '../modules/users/model';

const resetDB = async () => {
    await User.sync({ force: true });
    console.log('The table for the User model was just (re)created!');

    await User.bulkCreate([
        { login: 'Vasya', password: '12345', age: 15, isDeleted: false },
        { login: 'Masha', password: '12345', age: 22, isDeleted: false },
        { login: 'Petya', password: '12345', age: 30, isDeleted: false },
        { login: 'Kolya', password: '12345', age: 24, isDeleted: false },
        { login: 'Igor1', password: '12345', age: 55, isDeleted: false },
        { login: 'Igor2', password: '12345', age: 23, isDeleted: false },
        { login: 'Igor3', password: '12345', age: 44, isDeleted: false }
    ]);
};

resetDB();
