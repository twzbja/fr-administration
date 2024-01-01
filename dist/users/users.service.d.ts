import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(lastname: string, firstname: string, age: number): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    updateById(id: number, input: Partial<User>): Promise<User>;
    deleteById(id: number): Promise<boolean>;
}
