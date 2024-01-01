import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
export declare class AssociationsController {
    private readonly associationsService;
    constructor(associationsService: AssociationsService);
    getAllAssociations(): Promise<Association[]>;
    getAssociationById(id: number): Promise<Association>;
    createAssociation(input: Partial<Association>): Promise<Association>;
    updateAssociationById(id: number, body: Association): Promise<Association>;
    deleteAssociationById(id: number): Promise<boolean>;
    getMembersByAssociationId(id: number): Promise<number[]>;
}
