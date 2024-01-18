import { Minute } from './minute.entity';
import { MinutesService } from './minutes.service';
import { MinuteInput } from './MinuteInput.entity';
import { MinuteUpdate } from './MinuteUpdate.entity';
import { MinuteParam } from './MinuteParam.entity';
import { User } from 'src/users/user.entity';
export declare class MinutesController {
    private service;
    constructor(service: MinutesService);
    getAll(): Promise<Minute[]>;
    getById(parameter: MinuteParam): Promise<Minute>;
    create(input: MinuteInput): Promise<Minute>;
    update(input: MinuteUpdate, parameter: MinuteParam): Promise<Minute>;
    delete(parameter: MinuteParam): Promise<Boolean>;
    getUsersByMinute(parameter: MinuteParam): Promise<User[]>;
}
