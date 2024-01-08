import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './association.member';
import { RolesService } from 'src/roles/roles.service';
import { AssociationDTO } from './association.dto';

@Injectable()
export class AssociationsService {
    
    //le constructeur avec ses dependances
    constructor(
        @InjectRepository(Association)
        private AssociationRepostitory: Repository<Association>,
        private service: UsersService,
        //@Inject(forwardRef(() => RolesService))
        private roleService:RolesService
    ){}

    //envoyer la liste des associationDTO sionon une liste vide
    async getAll(): Promise<AssociationDTO[]> {
        let assoclist= await this.AssociationRepostitory.find();
        let dtolist=this.mapAssociationDTO(assoclist);
        return(dtolist);
    }

    //envoyer  la liste des membres d'une association ou une liste vide eventuellement
    //sinon envoyer une exeption si l'association n'est pas trouvé
    async getMembers(id: number): Promise<Member[]> {
        let assoc = await this.getById(id);
        let members=this.mapMembers(id,await assoc.users);
        return(members);
    }
    
    //recuperation d'une association à partir de son id
    async getById(id: number): Promise <Association> {
        try {
            return await this.AssociationRepostitory.findOneBy({id});
        } catch (error) {
            return null ;
        }
        
    }
    
    //mise à jour d'une association
    async update(idUsers: number[], name: string, id: number):Promise<Association> {
        let assoc = await this.getById(id);
        if (idUsers !== undefined) {
            for(let i=0; i<idUsers.length;i++){
                (await assoc.users)[i]=(await this.service.getById(idUsers[i]))
            }
        }
        if (name !== undefined) {
            assoc.name = name;
        }
        
        return await this.AssociationRepostitory.save(assoc);
    }

    //suppression d'une association
    async supprimer(id: number): Promise<Boolean> {
        try {
            let assoc = await this.getById(id);
            await this.AssociationRepostitory.remove(assoc);
            return true ;
        } catch (error) {
            return false ;
        }
        
    }

    //creation d'une association
    async create(nom: string, idUsers: number[]): Promise <Association> {
        const tabl = this.AssociationRepostitory.create({
          name:nom
        });

        if(idUsers){
          for(let i=0; i<idUsers.length;i++){
            (await tabl.users)[i]=(await this.service.getById(idUsers[i]))
          }
        }
        await this.AssociationRepostitory.save(tabl);
        return(tabl);
      }

    //la classe mapMember qui envoie un membre d'une association à partir d'un user 
    async mapMember(id_association,user:User):Promise<Member>{
        let role= await this.roleService.getById(user.id,id_association);
        let name="";
        if(role!=undefined){
            name=role.name ;
        }
        let member = new Member(user,name);
        return(member);
    }

     //la classe mapMembers qui envoi une liste de members d'une association à partir d'une liste de user 
     async mapMembers(id_association,user:User[]):Promise<Member[]>{
        let members=[];
        for(let i=0;i<user.length;i++){
            let ptr=user[i];
            members.push(await this.mapMember(id_association,ptr));
        }
        return(members);
     }

     //
     //la classe mapMembers qui envoi une associationDTO à partir d'une association
     async mapAssociationDTO(list_association:Association[]):Promise<AssociationDTO[]>{
        let list_association_dto=[];
        //
        for(let i=0;i<list_association.length;i++){
            let association=list_association[i];
            let members=this.mapMembers(association.id,await association.users);
            let associationdto=new AssociationDTO(association.id,association.name,await members);
            list_association_dto.push(associationdto);
        }
        return(list_association_dto);
     }

     //envoyer une association dto par son id sinon envoyer une exeption
     async getAssociationDTOById(id: number): Promise<AssociationDTO> {
        const association = await this.getById(id);
        return {
            id: association.id,
            name: association.name,
            members: await this.getMembers(association.id),
            minutes: association.minutes,
        };
    }

    //modifier une association apartir d'un objet association
    async updateAssocWithObjet(association:Association):Promise<void>{
        await this.AssociationRepostitory.save(association);
    }

}