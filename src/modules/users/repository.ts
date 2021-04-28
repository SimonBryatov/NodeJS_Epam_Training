import { ModelCtor, Op } from 'sequelize';

import { UserModel } from './model';

export class UserRepository {
    private userModel: ModelCtor<UserModel>;

    constructor(userModel: ModelCtor<UserModel>) {
        this.userModel = userModel;
    }

    findByLogin = (login: string) => this.userModel.findOne({ where: { login, isDeleted: false } });

    findById = (id: string) => this.userModel.findOne({ where: { id, isDeleted: false } });

    create = ({ login, password, age }: { login: string; password: string; age: number }) =>
        this.userModel.create({ login, password, age });

    update = (id: string, { login, age }: { login: string; age: number }) =>
        this.userModel.update({ login, age }, { where: { id } });

    remove = (id: string) => this.userModel.update({ isDeleted: true }, { where: { id } });

    getAllByLogin = (login: string, limit: number) =>
        this.userModel.findAll({
            limit,
            where: { login: { [Op.substring]: login }, isDeleted: false },
            order: [['login', 'ASC']]
        });
}
