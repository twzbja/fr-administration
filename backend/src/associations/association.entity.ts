import { Minute } from 'src/minutes/minute.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Association {
    @PrimaryGeneratedColumn('increment')
    public id : number;

    @Column()
    public name : string;

    @ManyToMany(type => User)
    @JoinTable()
    users: Promise <User[]>

    @OneToMany(type => Minute, minute => minute.association)
    minutes: Minute[]; //nom de la variable d'ici qui portes les minutes
   
    //declaration de la relation de Association à la classe Role
    @OneToMany(type => Role, role => role.idUser)
    @JoinColumn({ name: "id" })
    roles: Promise <Role[]>
}