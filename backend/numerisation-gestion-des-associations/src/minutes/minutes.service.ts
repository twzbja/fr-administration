import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Minute } from './minute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { min, throwError } from 'rxjs';
import { User } from 'src/users/user.entity';
import { BaseExceptionFilter } from '@nestjs/core';

@Injectable()
export class MinutesService {
    constructor(
        @InjectRepository(Minute)
        private MinuteRepostitory: Repository<Minute>,
        private serviceAssoc: AssociationsService,
        private serviceUser: UsersService
    ){}
    //envoyer la liste de toutes les minutes
    async getAll(): Promise<Minute[]> {
        return await this.MinuteRepostitory.find();
    }

    //envoyer une minute à partir de son id sinon une exeption
    async getById(id:number): Promise <Minute> {
        let ptr = await this.MinuteRepostitory.findOne({ 
            where: { id },
         });
         if(ptr instanceof Minute){return(ptr);}
         return null;
    }

    //mettre à jour un users sinon envoyer une exeption
    async update(content: string, idVoters: number[], idAssoc: number, date: string, id: number):Promise<Minute> {
        try {
            let minute = await this.getById(id);
            if (content !== undefined) {
                minute.content = content;
            }
            if (date !== undefined) {
                minute.date = date;
            }
            if (idAssoc !== undefined) {
                minute.association = await this.serviceAssoc.getById(idAssoc);
                (await minute.idVoters).length=0;
                //
                if (idVoters !== undefined){
                    //
                    let users = await minute.association.users;
                    //let voters= [];
                    for(let i=0;i<users.length;i++){
                        if(idVoters.includes(users[i].id)){
                            (await minute.idVoters).push(users[i]);
                        }
                    }
                }
            }
            return await this.MinuteRepostitory.save(minute);
        } catch (error) {
            return null ;
        }
    }

    //supprimer une minute et envoyer true sionon false
    //une exeption si la minute n'est pas trouvé
    async supprimer(id: number): Promise<Boolean> {
        try {
            let minute = await this.getById(id);
            if(await this.MinuteRepostitory.remove(minute)){
                return(true);
            }
            else{
                return(false);
            }
        } catch (error) {
              return null ;
        }
    }
    
    //creer une minute et la renvoyer sinon une exeption si impossible
    async create(content: string, date: string, idAssoc: number, idVoters: number[]): Promise <Minute> {
        try {
            console.log("debut:");
            //on cree la minuite
            let minute = await this.MinuteRepostitory.create({
                content : content,
                date : date
            });
            //on recupere l'association
            let association=await this.serviceAssoc.getById(idAssoc);
            let users = await association.users;
            //on reseigne les users_voters et l'association dans la minute
            for(let i=0;i<users.length;i++){
                if(idVoters.includes(users[i].id))
                    (await minute.idVoters).push(users[i]);
                }
            minute.association = association ;
            //on enregistre la minute
            return await this.MinuteRepostitory.save(minute);
            //return minute ;
        } catch (error) {
            return null ;
        }
    }

    //envoyer la liste des minutes d'une associations ou la liste vide eventuellement
    async getMinuteByAssociationId(id_association:number): Promise<Minute[]>{
       
        return await this.MinuteRepostitory.find({
            where:{
                association:{
                    id:id_association
                }
            }
        })
    }
    //envoyer la liste des users d'une minute
    async getUsersByMinuteId(id : number) : Promise<User[]>{
        try {
            let minute = await this.getById(id);
            let uses=await minute.idVoters ;
            return uses;
        } catch (error) {
            return null ;
        }
    }
}
