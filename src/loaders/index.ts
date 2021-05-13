import { expressLoader } from './express';
import { sequelizeLoader } from './sequelize';

export default async ({ expressApp, config }) => {
    expressLoader({ app: expressApp });
    sequelizeLoader();
};
