import express from 'express';

import mainRouter from '../api';

export const expressLoader = ({ app }: { app: express.Application }) => {
    // BASE MIDDLEWARES
    app.use(express.json());
    // BASE ROUTER
    app.use('/', mainRouter);
};
