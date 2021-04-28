import { ApiUserError, API_USER_ERROR_TYPE } from '../errors';
import { UserRepository } from '../repository';

export class UserHook {
    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    checkForExistingLogin = async (login: string) => {
        const foundUser = await this.userRepo.findByLogin(login);

        if (foundUser) {
            throw new ApiUserError(API_USER_ERROR_TYPE.alreadyExists);
        }
    };

    findById = async (id: string) => {
        const userRecord = await this.userRepo.findById(id);

        if (!userRecord) {
            throw new ApiUserError(API_USER_ERROR_TYPE.notFound);
        }

        return userRecord;
    };
}
