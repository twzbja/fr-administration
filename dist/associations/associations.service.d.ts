import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
export declare class AssociationsService {
    private userService;
    private associationRepository;
    constructor(userService: UsersService, associationRepository: Repository<Association>);
    getAllAssociations(): Promise<Association[]>;
    getAssociationById(id: number): Promise<Association>;
    createAssociation(userIds: number[], name: string): Promise<Association>;
    updateAssociationById(id: number, updatedAssociation: Association): Promise<Association>;
    deleteAssociationById(id: number): Promise<boolean>;
    getMembersByAssociationId(id: number): Promise<number[]>;
}
