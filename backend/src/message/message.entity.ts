export class Message{
    association:String; //the association sending the message
    topic:string; //the topic of the message
    message:string; //the body of the message
    destinator:string //l'adreese email of the user
    constructor(association:string,destinator:string,topic:string,message:string){
        this.association=association;
        this.topic=topic;
        this.message=message;
        this.destinator=destinator;
    }
}
