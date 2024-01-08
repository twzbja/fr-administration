import { User } from 'src/users/user.entity';
import { Association } from 'src/associations/association.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Minute {

    @PrimaryGeneratedColumn('increment')
    public id : number;

    @Column()
    public content : string;

    @ManyToMany(type => User)
    @JoinTable()
    idVoters: Promise <User[]>

    @Column()
    public date: string;

    @ManyToOne(type => Association, association => association.minutes)
    association: Association; // nom de la variable d'ici qui porte l'association 
}