import { isCelebrateError, Segments } from 'celebrate';
import { ErrorRequestHandler } from 'express';

import { ApiUserError, API_USER_ERROR_CATEGORY } from '../modules/users/errors';

const isApiUserError = (err: any): err is ApiUserError => err.category === API_USER_ERROR_CATEGORY;

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let status = 500;
    let message = 'Server failed';

    if (isCelebrateError(err)) {
        const paramsErrorMessage = err.details.get(Segments.PARAMS)?.message;
        const bodyErrorMessage = err.details.get(Segments.BODY)?.message;
        const queryErrorMessage = err.details.get(Segments.QUERY)?.message;

        if (paramsErrorMessage || bodyErrorMessage || queryErrorMessage) {
            status = 400;
            message = paramsErrorMessage || bodyErrorMessage || queryErrorMessage;
        }
    } else if (isApiUserError(err)) {
        status = err.description.status;
        message = err.description.message;
    }

    res.status(status);
    res.json({ message });
};
