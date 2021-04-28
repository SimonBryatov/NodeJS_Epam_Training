import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../loaders/sequelize';

export interface UserModel extends Model {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export const User = sequelize.define<UserModel>('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});
