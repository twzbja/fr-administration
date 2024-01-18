import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private UsersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}
    
    //methode utiliser par la local strategy pour authentifier un user
    public async validateUser(id: number, password: string) : Promise<User> {
        const user = await this.UsersRepository.findOneBy({id:id});
        if (user && bcrypt.compare(password, user.password)){
            //const { password, ...result } = user;
            return user;
        }
        return undefined;
    }
    //methode par loginController utiliser pour envoyer un token apres authentification
    async login(user: any) {
        const payload = { username: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
   }
}
