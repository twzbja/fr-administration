import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";

@Entity()
export class Role {
    //
    @PrimaryColumn()
    public idUser : number;

    //
    @PrimaryColumn()
    public idAssociation: number;

    @Column()
    public name : string;

    //definition du lien d'association de type double plusieurs à plusieurs
    
    @ManyToOne(type => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "idUser" })
    user: Promise <User>

    @ManyToOne(type => Association, association => association.id)
    @JoinColumn({ name: "idAssociation" })
    association: Promise<Association>
   
}