import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';
export declare class AssociationsService {
    private service;
    constructor(service: UsersService);
    private associations;
    getAllAssociations(): Association[];
    getAssociationById(id: number): Association;
    createAssociation(idUsers: number[], name: string): Promise<Association>;
    updateAssociationById(id: number, updatedAssociation: Association): Association;
    deleteAssociationById(id: number): boolean;
    getMembersByAssociationId(id: number): number[];
}
