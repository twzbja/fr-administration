import { Role } from "src/roles/role.entity";
import { User } from "src/users/user.entity";

export class Member{
    id:number;
    name:string;
    firstname:string;
    age:number;
    role:string;
    constructor(user:User,role:string){
        this.id=user.id;
        this.name=user.lastname;
        this.firstname=user.firstname;
        this.age=user.age;
        this.role=role;
    }
}