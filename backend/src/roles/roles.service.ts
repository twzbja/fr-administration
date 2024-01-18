import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

//@Injectable()
//export class RolesService {}

@Injectable()
export class  RolesService{

    //le contructeur du roleservice avec injection du Rolerepository importé depuis le module typeorem
    constructor(
        @InjectRepository(Role)
        private RoleRepostitory: Repository<Role>
    ){}

    // envoyer le role d'un user pour une association donnée
    async getById(id_user: number,id_association:number): Promise <Role> {

        let listrole= await this.getAllRoleUserAssociation(id_user,id_association);
        return(listrole[0]);
    }

    //mise a jour du nom d'une association:U
    async update(id_user: number,id_association: number,name: string):Promise<Role> {

        let role = await this.getById(id_user,id_association);
        //
        if (role != undefined) {
          role.name=name;
          return await this.RoleRepostitory.save(role);
        }
        //
        else{
            throw new DOMException("role non trouvé");
        }
    }

    // la supprimer un role s'il existe sinon envoyer une exeption
    async delete(id_user: number,id_association:number): Promise<Boolean> {
        //on retrouve l'objet
        let listrole = await this.getById(id_user,id_association);
        //let role=listrole[0];
        if(listrole==undefined){
            throw new DOMException(' role non trouvé ');
        }
        //on suppression
        if(this.RoleRepostitory.remove(listrole)){
            return(true);
        }
        return(false);
    }

    //creer un role pour un user d'une association oubien envoyer exeption si impossible pour des problemes de contrainte de clé
    async create(id_user: number,id_association:number,name_role: string): Promise <Role> {
        //
        const role = this.RoleRepostitory.create({
            idUser:id_user,
            idAssociation:id_association,
            name:name_role
        })
        //
        try {
            await this.RoleRepostitory.save(role);
            return(role);
        } catch (error) {
            throw new DOMException("impossible de creer ce role car contrainte key fail");
        }
    }

/* **************************************************************************************************************** */

    //Methode Elementaires utilisées dans le Read de l'operation crud

    //recuperation de la liste de toutes les roles de toutes les associations
    async getAllRole(): Promise<Role[]> {
        return await this.RoleRepostitory.find();
    }

    //recuperer tous les roles des membres d'une association
    async getAllRoleAssociation(id_association: number): Promise<Role[]> {
        return await this.RoleRepostitory.find({
            where: {
                idAssociation: id_association
            }
        })
    }

    //recuperer tous les roles d'un utilisateur
    //envoyer la liste vide s'il n'a pas de role ou si le user n'existe pas
    async getRolesByUserId(id_user: number): Promise<Role[]> {
        return await this.RoleRepostitory.find({
            where: {
                idUser: id_user
            }
        })
    }

    //recuperer tous les roles d'un utilisateur dans une association
    async getAllRoleUserAssociation(id_user: number,id_association: number): Promise<Role[]> {
        return await this.RoleRepostitory.find({
            where: {
                idUser: id_user,
                idAssociation: id_association
            }
        })
    }

    //recuperation de tous les roles ayant un non donné
    async getRoleByRoleName(role_name:string): Promise<Role[]> {
        return await this.RoleRepostitory.find({
            where:{
                name:role_name
            }
        })
    }
}

/*
function NotFoundException(): unknown {
    throw new Error('Function not implemented.');
}
*/
