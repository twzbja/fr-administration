import { User } from "src/users/user.entity";
export declare class Member {
    id: number;
    name: string;
    firstname: string;
    age: number;
    role: string;
    constructor(user: User, role: string);
}
