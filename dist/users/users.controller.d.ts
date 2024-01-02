import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserInput } from './user-input';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(input: UserInput): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    updateById(id: number, input: UserInput): Promise<User>;
    deleteById(id: number): Promise<boolean>;
}
