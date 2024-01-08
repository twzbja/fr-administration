import { Association } from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Member } from './association.member';
import { RolesService } from 'src/roles/roles.service';
import { AssociationDTO } from './association.dto';
export declare class AssociationsService {
    private AssociationRepostitory;
    private service;
    private roleService;
    constructor(AssociationRepostitory: Repository<Association>, service: UsersService, roleService: RolesService);
    getAll(): Promise<AssociationDTO[]>;
    getMembers(id: number): Promise<Member[]>;
    getById(id: number): Promise<Association>;
    update(idUsers: number[], name: string, id: number): Promise<Association>;
    supprimer(id: number): Promise<Boolean>;
    create(nom: string, idUsers: number[]): Promise<Association>;
    mapMember(id_association: any, user: User): Promise<Member>;
    mapMembers(id_association: any, user: User[]): Promise<Member[]>;
    mapAssociationDTO(list_association: Association[]): Promise<AssociationDTO[]>;
    getAssociationDTOById(id: number): Promise<AssociationDTO>;
    updateAssocWithObjet(association: Association): Promise<void>;
}
