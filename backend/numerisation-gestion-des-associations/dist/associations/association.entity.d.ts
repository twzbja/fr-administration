import { Minute } from 'src/minutes/minute.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
export declare class Association {
    id: number;
    name: string;
    users: Promise<User[]>;
    minutes: Minute[];
    roles: Promise<Role[]>;
}
