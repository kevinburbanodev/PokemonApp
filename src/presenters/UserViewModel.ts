import { useState } from 'react';
import { GetUsersUseCase } from '../use-cases/GetUsersUseCase';
import { User } from '../entities/User';

export const useUserViewModel = (getUsersUseCase: GetUsersUseCase) => {
    const [users, setUsers] = useState<User[]>([]);

    const loadUsers = async () => {
        const usersList = await getUsersUseCase.execute();
        setUsers(usersList);
    };

    return {
        users,
        loadUsers,
    };
};
