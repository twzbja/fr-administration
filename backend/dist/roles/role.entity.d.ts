import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
export declare class Role {
    idUser: number;
    idAssociation: number;
    name: string;
    user: Promise<User>;
    association: Promise<Association>;
}
