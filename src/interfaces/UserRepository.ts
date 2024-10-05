// interfaces/UserRepository.ts
import { User } from '../entities/User';

export interface UserRepository {
    getAllUsers(): Promise<User[]>;
    addUser(user: User): Promise<void>;
    editUser(user: User): Promise<void>;
    deleteUser(user: User): Promise<void>;
}
