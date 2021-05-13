import { Sequelize, Dialect } from 'sequelize';
import appConfig from '../appConfig';

export const sequelize = new Sequelize(appConfig.dbConnectUrl, { dialect: appConfig.dbDialect as Dialect });

export const sequelizeLoader = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection with DB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
