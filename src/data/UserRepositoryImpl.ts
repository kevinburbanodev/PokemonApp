import { User } from '../entities/User';
import { UserRepository } from '../interfaces/UserRepository';
import { UserManager } from './UserManager';

export class UserRepositoryImpl implements UserRepository {
    constructor(private userManager: typeof UserManager) { }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userManager.getUsers();
        return users;
    }

    async addUser(user: User): Promise<void> {
        await this.userManager.addUser(user);
    }

    async editUser(user: User): Promise<void> {
        await this.userManager.editUser(user);
    }

    async deleteUser(user: User): Promise<void> {
        await this.userManager.deleteUser(user.id);
    }
}
