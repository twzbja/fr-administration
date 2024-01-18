import { Role } from "src/roles/role.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    public id : number;

    @Column()
    public lastname : string;

    @Column()
    public firstname : string;
    
    @Column()
    public age: number;

    @Column()
    public password: string;
    
    //declaration de la relation de User à la classe Role
    @OneToMany(type => Role, roles => roles.idUser)
    @JoinColumn({ name: "id" })
    roles: Promise <Role[]>
}