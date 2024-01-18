import { Minute } from "src/minutes/minute.entity";
import { Member } from "./association.member";

export class AssociationDTO{
    id:number;
    name:String;
    members:Member[];
    minutes:Minute[];
    constructor(id:number, name:string,members:Member[]){
        this.id=id,
        this.name=name;
        this.members=members;
        this.minutes=[];
    }
}