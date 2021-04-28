import { UserModel } from './model';

export const fromRawToUserData = (record: UserModel) => ({
    id: record.id,
    login: record.login,
    age: record.age
});

export const fromRawToLoginSuggestResults = (records: UserModel[]) => records.map((record) => record.login);
