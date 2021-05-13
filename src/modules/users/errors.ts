export const API_USER_ERROR_CATEGORY = 'api/user';

export enum API_USER_ERROR_TYPE {
    notFound,
    alreadyExists
}

type ErrorDescription = { message: string; status: number };

const API_USER_ERROR_DESCRIPTION: Record<API_USER_ERROR_TYPE, ErrorDescription> = {
    [API_USER_ERROR_TYPE.notFound]: { message: 'User not found', status: 404 },
    [API_USER_ERROR_TYPE.alreadyExists]: {
        message: 'User with this login already exists',
        status: 409
    }
};

export class ApiUserError extends Error {
    category: string;
    description: ErrorDescription;

    constructor(errorType: API_USER_ERROR_TYPE) {
        super();
        this.category = API_USER_ERROR_CATEGORY;
        this.description = API_USER_ERROR_DESCRIPTION[errorType];
    }
}
