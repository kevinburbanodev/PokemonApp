import { UserRepository } from '../interfaces/UserRepository';
import { User } from '../entities/User';

export class GetUsersUseCase {
    constructor(private userRepository: UserRepository) { }

    execute(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }
}
