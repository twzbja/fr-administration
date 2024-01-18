import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Association } from 'src/associations/association.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Message } from './message.entity';
//import { Message } from './message.entity';

@Injectable()
export class MessageService {
    constructor(
        @Inject('GREETING_SERVICE') private client: ClientProxy
        ){}
    
    //methode methode qui permet d'envoyer msg dans le canal de RABITMQ formaté selon la classe Message
    async publishEvent(message:Message) {
        await this.client.emit('book-created',message);
    }
    //envoie de message au users d'une association
    async sendGroupeMessageToAssocUsers(association:Association): Promise<void>{
        try {
            let topic = "Bienvenue dans l'association "+association.name+"";
            let message ="vous avez été ajouté dans l'association "+association.name+" vous pouvez maintenant participer aux minutes de celle-ci";
            //
            let users = await association.users;
            let taille = await users.length;
            //
            for(let i=0;i<taille;i++){
                let name = await association.name;
                let email = await users[i].email;
                let msg = new Message(name,email,topic,message);
                this.publishEvent(msg);
                console.log("**message"+i+" envoyé par nest**");
            }
        } catch (error) {
            console.log("groupe de message non envoyé car un probleme est du survenir");
        }
    }
    //envoie de message pour l'attribution d'un role
    async sendMessageForAddingRole(role:string,association_name:string,user:User){
        try {
            let topic="ASSOCIATION "+association_name+" : Atribution de role";
            let message ="Le role "+role+" vous a été attribué dans l'association "+association_name;
            let msg = new Message(association_name,user.email,topic,message);
            this.publishEvent(msg);
        } catch (error) {
            console.log("message d'attribution de role non envoyé");
        }
    }
 }
