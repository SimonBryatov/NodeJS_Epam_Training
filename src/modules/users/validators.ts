import { celebrate, Joi, Segments } from 'celebrate';

const loginValidator = Joi.string().required().max(32);

const passwordValidator = Joi.string()
    .required()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
        name: 'contains numbers and letters'
    });

const ageValidator = Joi.number().integer().required().min(4).max(130);

const idValidator = Joi.string().guid({
    version: ['uuidv4']
});

export const getUserValidator = celebrate({
    [Segments.PARAMS]: {
        id: idValidator
    }
});

export const createUserValidator = celebrate({
    [Segments.BODY]: Joi.object({
        login: loginValidator,
        password: passwordValidator,
        age: ageValidator
    })
});

export const updateUserValidator = celebrate({
    [Segments.PARAMS]: {
        id: idValidator
    },
    [Segments.BODY]: Joi.object({
        login: loginValidator,
        age: ageValidator
    })
});

export const deleteUserValidator = celebrate({
    [Segments.PARAMS]: {
        id: idValidator
    }
});

export const autoSuggestUserValidator = celebrate({
    [Segments.QUERY]: {
        login: Joi.string().required(),
        limit: Joi.number().min(1).max(20).required()
    }
});
