import { User } from './user.entity';
export declare class UsersService {
    private users;
    create(lastname: string, firstname: string, age: number): User;
    getAll(): User[];
    getById(id: number): User;
    updateById(id: number, input: Partial<User>): User;
    deleteById(id: number): boolean;
}
