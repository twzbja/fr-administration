import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserInput } from './UserInput.entity';
import { UserParam } from './UserParam.entity';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/role.entity';
export declare class UsersController {
    private service;
    private RoleService;
    constructor(service: UsersService, RoleService: RolesService);
    getAll(): Promise<User[]>;
    getById(parameter: UserParam): Promise<User>;
    create(input: UserInput): Promise<User>;
    update(input: UserInput, parameter: UserParam): Promise<User>;
    supprimer(parameter: UserParam): Promise<Boolean>;
    getRolesByUserId(parameter: UserParam): Promise<Role[]>;
}
