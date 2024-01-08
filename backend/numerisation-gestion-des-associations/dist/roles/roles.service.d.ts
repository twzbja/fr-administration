import { Repository } from 'typeorm';
import { Role } from './role.entity';
export declare class RolesService {
    private RoleRepostitory;
    constructor(RoleRepostitory: Repository<Role>);
    getById(id_user: number, id_association: number): Promise<Role>;
    update(id_user: number, id_association: number, name: string): Promise<Role>;
    delete(id_user: number, id_association: number): Promise<Boolean>;
    create(id_user: number, id_association: number, name_role: string): Promise<Role>;
    getAllRole(): Promise<Role[]>;
    getAllRoleAssociation(id_association: number): Promise<Role[]>;
    getRolesByUserId(id_user: number): Promise<Role[]>;
    getAllRoleUserAssociation(id_user: number, id_association: number): Promise<Role[]>;
    getRoleByRoleName(role_name: string): Promise<Role[]>;
}
