import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import 'express-async-errors';
import loaders from './loaders';
import config from './appConfig';

import './loaders/sequelize';

const startServer = async () => {
    const app = express();

    await loaders({ expressApp: app, config });

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`App started and listening at port:${port}`);
    });
};

startServer();
