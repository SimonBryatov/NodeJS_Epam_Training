export type RequestBodyCreateUser = {
    login: string;
    password: string;
    age: number;
};

export type RequestBodyUpdateUser = {
    login: string;
    age: number;
};
