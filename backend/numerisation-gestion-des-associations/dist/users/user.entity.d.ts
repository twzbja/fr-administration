import { Role } from "src/roles/role.entity";
export declare class User {
    id: number;
    lastname: string;
    firstname: string;
    age: number;
    password: string;
    roles: Promise<Role[]>;
}
