import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UsersRepository;
    private jwtService;
    constructor(UsersRepository: Repository<User>, jwtService: JwtService);
    validateUser(id: number, password: string): Promise<User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
