import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
export declare class AssociationsController {
    private readonly associationsService;
    constructor(associationsService: AssociationsService);
    getAllAssociations(): Association[];
    getAssociationById(id: number): Association;
    createAssociation(input: Partial<Association>): Promise<Association>;
    updateAssociationById(id: number, body: Association): Association;
    deleteAssociationById(id: number): boolean;
    getMembersByAssociationId(id: number): number[];
}
