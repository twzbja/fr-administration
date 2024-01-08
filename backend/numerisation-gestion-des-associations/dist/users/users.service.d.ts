import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Member } from 'src/associations/association.member';
export declare class UsersService {
    private UsersRepository;
    private RoleService;
    constructor(UsersRepository: Repository<User>, RoleService: RolesService);
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    create(nom: string, prenom: string, age: number, password: string): Promise<User>;
    update(nom: string, prenom: string, age: number, id: number, password: string): Promise<User>;
    supprimer(id: number): Promise<Boolean>;
    getUsersByRoleName(role_name: string): Promise<Member[]>;
}
