import { Minute } from './minute.entity';
import { Repository } from 'typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
export declare class MinutesService {
    private MinuteRepostitory;
    private serviceAssoc;
    private serviceUser;
    constructor(MinuteRepostitory: Repository<Minute>, serviceAssoc: AssociationsService, serviceUser: UsersService);
    getAll(): Promise<Minute[]>;
    getById(id: number): Promise<Minute>;
    update(content: string, idVoters: number[], idAssoc: number, date: string, id: number): Promise<Minute>;
    supprimer(id: number): Promise<Boolean>;
    create(content: string, date: string, idAssoc: number, idVoters: number[]): Promise<Minute>;
    getMinuteByAssociationId(id_association: number): Promise<Minute[]>;
    getUsersByMinuteId(id: number): Promise<User[]>;
}
