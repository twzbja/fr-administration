import { User } from 'src/users/user.entity';
import { Association } from 'src/associations/association.entity';
export declare class Minute {
    id: number;
    content: string;
    idVoters: Promise<User[]>;
    date: string;
    association: Association;
}
