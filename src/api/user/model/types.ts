export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

export type CreateUserParams = Pick<User, 'login' | 'password' | 'age'>;

export type UpdateUserParams = Pick<User, 'login' | 'age'>;
