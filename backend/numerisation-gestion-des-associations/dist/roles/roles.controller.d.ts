import { Member } from 'src/associations/association.member';
import { UsersService } from 'src/users/users.service';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { RolesService } from './roles.service';
export declare class RolesController {
    private service;
    private UserService;
    constructor(service: RolesService, UserService: UsersService);
    getById(parameter: RoleInput): Promise<Role>;
    create(input: RoleInput): Promise<Role>;
    update(parameter: RoleInput, input: RoleUpdate): Promise<Role>;
    supprimer(parameter: RoleInput): Promise<Boolean>;
    getUsersByRoleName(parameter: RoleInput): Promise<Member[]>;
}
