import { Association } from './associations.entity';
export declare class AssociationsService {
    private associations;
    getAllAssociations(): Association[];
    getAssociationById(id: number): Association;
    createAssociation(id: number, idUsers: number[], name: string): Association;
    updateAssociationById(id: number, updatedAssociation: Association): Association;
    deleteAssociationById(id: number): boolean;
    getMembersByAssociationId(id: number): number[];
}
