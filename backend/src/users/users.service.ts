import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Controller, Get, Body, Post, Param, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { Member } from 'src/associations/association.member';

@Injectable()
export class UsersService {
    
    //constructeur avec les dependances de la classe
    constructor(
            @InjectRepository(User)
            private UsersRepository: Repository<User>,
            private RoleService:RolesService
        ) {}
    
    //envoyer la liste de tous les users sinon une liste vide
    public async getAll(): Promise<User[]> {
        return await this.UsersRepository.find();
    }
    
    //envoyer le user dont l'id est passé en param sinon une exeption
    public async getById(id: number): Promise<User> {
        let ptr= await this.UsersRepository.findOneBy({id:id});
        if(ptr!=undefined){
            return ptr;
        }
        else{
            throw new DOMException("user avec id= "+id+" non trouvé");
        }
    }
    
    //creer un utilisateur et renvoyer l'utilisateur sinon envoyer une exeption pour signaler les param mal renseigner
    public async create(nom: string, prenom: string, age: number, password: string): Promise<User> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const newUser = await this.UsersRepository.create({
            lastname: prenom,
            firstname: nom,
            age: age,
            password: hash
        }
        );
        try {
            await this.UsersRepository.save(newUser);
            return(newUser);
        } catch (error) {
            throw new DOMException("param incomplet ou incorrect");
        } 
    }
    
    //mettre à jour un utilisateur  et envoyer la mise à jour s'il existe sinon envoyer une exeption
    public async update(nom: string, prenom: string, age: number, id: number, password: string): Promise<User> {
        
        let user=await this.getById(id);
        if(user!=undefined){
            if (prenom !== undefined) {
                user.lastname = prenom;
            }
            if (nom !== undefined) {
                user.firstname = nom;
            }
            if (age !== undefined) {
                user.age = age;
            }
            if (password !== undefined) {
                user.password = password;
            }
            return await this.UsersRepository.save(user);
        }
        else{
            throw new DOMException("user avec id = "+id+" non trouvé");
        }
    }
   
    //supprimer user dont l'id est passé en param:
    //envoyer true s'il est supprimer
    //envoyer false si une contrainte à echouée
    //envoyer une exeption si le user n'est pas trouvé
    public async supprimer(id: number): Promise<Boolean> {

        let user = await this.getById(id);
        try {
            this.UsersRepository.remove(user);
            return true;
        } catch (error) {
            return(false);
        }
    }
    
    //envoyer la liste des users qui joue un role donné sion envoyer la liste vide
    public async getUsersByRoleName(role_name:string): Promise<Member[]> {
        /* ********************************************************** */
        let listUser=[];
        //obtention de tous les roles ayant le non role_name
        let listRole= await this.RoleService.getRoleByRoleName(role_name);
        //obtention de tous les user ayant leur id dans la liste precednte
        if(listRole!=undefined){
            //console.log(listRole);
            for(let i=0;i< listRole.length;i++){
                let id=listRole[i].idUser;
                let user = await this.getById(id);
                listUser.push(new Member(user,role_name));
            }
        }
        return (listUser);
        /** ******************************************* */
    }
}
