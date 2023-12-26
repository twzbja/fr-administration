import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(input: Partial<User>): User;
    getAll(): User[];
    getById(id: number): User;
    updateById(id: number, input: Partial<User>): User;
    deleteById(id: number): boolean;
}
