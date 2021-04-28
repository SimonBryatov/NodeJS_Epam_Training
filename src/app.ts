import dotenv from 'dotenv';
import express from 'express';
import mainRouter from './api/mainRouter';

dotenv.config();

const app = express();

// BASE MIDDLEWARES
app.use(express.json());

// BASE ROUTER
app.use('/', mainRouter);

// START APP
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App started and listening at port:${port}`);
});
