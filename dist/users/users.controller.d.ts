import { User } from './user.entity';
export declare class UsersController {
    create(input: Partial<User>): User;
    getAll(): User[];
    getById(id: number): User;
    updateById(id: number, input: Partial<User>): User;
    deleteById(id: number): boolean;
}
