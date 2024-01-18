import { Body, Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Member } from 'src/associations/association.member';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { RolesService } from './roles.service';
import { MessageService } from 'src/message/message.service';

@Controller('roles')
export class RolesController {

    constructor(
        private service: RolesService,
        //@Inject(forwardRef(() => UsersService))
        private UserService:UsersService,
        private messageService:MessageService

    ) {}

    //Regroupement sous le tag
    @ApiTags('Recuperer les roles pour un user /dans une association ')
    @Get(':idUser/:idAssociation/role')
    //envoyer le role d'un user pour une association donné ou eventuellement null
    //si l'association, le user ou le role  n'existe pas
    getById(@Param() parameter: RoleInput): Promise<Role> {
        return this.service.getById(+parameter.idUser,+parameter.idAssociation);  
    }

    //Regroupement sous le tag
    @ApiTags('Creer un role')
    @Post()
    @ApiCreatedResponse({
        description: 'The role has been successfully created.'
    })
    //creer un role et le renvoyer sinon envoyer une exeption s'il y'a contraint key fail
    async create(@Body() input: RoleInput): Promise<Role> {
        let ptr = await this.service.create(input.idUser, input.idAssociation,input.name);
        if (ptr==null) {
            throw new HttpException(` fail to create role with the couple (idUser,IdAssociation)=${input.idUser} ${input.idAssociation} the role may already existe or the user or association may not existe`, HttpStatus.CONFLICT);
        } else {
            let user = await this.UserService.getById(ptr.idUser);
            let assoc_name = await (await ptr.association).name;
            let role = await ptr.name;
            this.messageService.sendMessageForAddingRole(role,assoc_name,user);
            return(ptr);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Mettre à jour un role')
    @Put(':idUser/:idAssociation')
    //mettre a jour un role s'il existe sinon envoyer une exeption
    async update(@Param() parameter: RoleInput,@Body() input: RoleUpdate): Promise<Role> {
        let ptr = await this.service.update(parameter.idUser, parameter.idAssociation, input.name);
        if (ptr==null) {
            throw new HttpException(` fail to update the role with the couple (idUser,IdAssociation)=${parameter.idUser} ${parameter.idAssociation} the role  may note existe`, HttpStatus.NOT_FOUND);
        } else {
            let user = await this.UserService.getById(ptr.idUser);
            let assoc_name = await (await ptr.association).name;
            let role = await ptr.name;
            this.messageService.sendMessageForAddingRole(role,assoc_name,user);
            return(ptr);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Supprimer un role')
    @Delete(':idUser/:idAssociaton')
    //supprimer un role s'il exste sinon enyoyer une exeption
    supprimer(@Param() parameter: RoleInput): Promise<Boolean> {
        try {
            return this.service.delete(parameter.idUser,parameter.idAssociation);  
        }catch(DOMException) {
            throw new HttpException(` Role not find with the couple (idUser,IdAssociation)=${parameter.idUser} ${parameter.idAssociation}`, HttpStatus.NOT_FOUND);
        }  
    }
    
    //Regroupement sous le tag
    @ApiTags('getting all the user having a given role')
    @ApiCreatedResponse({
        description: 'The users has been successfully founded.'
    })
    //
    @Get('users/roles/:name')
    //envoyer la liste des users d'un role donné ou enventuellement la liste vide
    async getUsersByRoleName(@Param() parameter: RoleInput): Promise<Member[]> {
        return this.UserService.getUsersByRoleName(parameter.name);  
    }

}
