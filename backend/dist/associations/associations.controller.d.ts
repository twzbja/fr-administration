import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { AssociationInput } from './AssociationInput.entity';
import { AssociationParam } from './AssociationParam.entity';
import { AssociationDTO } from './association.dto';
import { Member } from './association.member';
import { Minute } from 'src/minutes/minute.entity';
import { MinutesService } from 'src/minutes/minutes.service';
export declare class AssociationsController {
    private service;
    private MinuteService;
    constructor(service: AssociationsService, MinuteService: MinutesService);
    getAll(): Promise<AssociationDTO[]>;
    getById(parameter: AssociationParam): Promise<AssociationDTO>;
    getMembers(parameter: AssociationParam): Promise<Member[]>;
    create(input: AssociationInput): Promise<Association>;
    update(input: AssociationInput, parameter: AssociationParam): Promise<Association>;
    supprimer(parameter: AssociationParam): Promise<Boolean>;
    getMinuteByAssociationId(parameter: AssociationParam): Promise<Minute[]>;
}
