import { User } from '../entities/User';

export const UserManager = {
    currentId: 1,
    fakeUserList: [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30 }
    ] as User[],

    addUser(user: User): void {
        this.fakeUserList.push({ ...user, id: this.currentId++ });
    },

    editUser(user: User): void {
        const index = this.fakeUserList.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            this.fakeUserList[index] = { ...this.fakeUserList[index], ...user };
        }
    },

    deleteUser(userId: number): void {
        this.fakeUserList = this.fakeUserList.filter((user) => user.id !== userId);
    },

    getUsers(): User[] {
        return this.fakeUserList;
    },
};
