import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(input: Partial<User>): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    updateById(id: number, input: Partial<User>): Promise<User>;
    deleteById(id: number): Promise<boolean>;
}
