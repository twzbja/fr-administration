import { Controller, Get, Body, Post, Param, HttpException, HttpStatus, Put, Delete, UseGuards, forwardRef, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UserInput } from './UserInput.entity';
import { UserParam } from './UserParam.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/role.entity';

//Regroupement sous le tag users
@ApiTags('users')
@Controller('users')
export class UsersController {

    //le constructeur avec ses dependances
    constructor(
        private service: UsersService,
        //@Inject(forwardRef(() => RolesService))
        private RoleService: RolesService
    ) {}
    
    //Regroupement sous le tag
    @ApiTags('Recuperer un/des utilisateur(s)')
    //@UseGuards(AuthGuard('jwt'))
    @Get()
    //envoyer la liste de tous les users sinon une liste vide
    async getAll(): Promise<User[]> {
        return this.service.getAll();
    }
    
    //Regroupement sous le tag
    @ApiTags('Recuperer un/des utilisateur(s)')
    @Get(':id')
    @ApiCreatedResponse({
        description: 'The user has been successfully founded.'
    })
    //envoer le user dont l'id est passé en parma sinon envoyer une exception http
    async getById(@Param() parameter: UserParam): Promise<User> {
        try {
            return this.service.getById(+parameter.id);   
        }catch(DOMException) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag 
    @ApiTags('Creer un utilisateur')
    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })

    //cree un user et le renvoyer 
    //sinon envoyer une http exception pour signaler que la requete est mauvaise 
    async create(@Body() input: UserInput): Promise<User> {
        try {
            return this.service.create(input.firstname, input.lastname, input.age, input.password);
        } catch (DOMException) {
            throw new HttpException(`wrong body parameters, go to /api to check the correct parmeters`, HttpStatus.BAD_REQUEST);
        }
        
    }

    //Regroupement sous le tag
    @ApiTags('Mettre à jour un utilisateur')
    @Put(':id')
    @ApiCreatedResponse({
        description: 'The user has been successfully updated.'
    })
    //mettre à jour le user et le renvoyer s'il est trouvé 
    //sinon envoyer une http exception pour signer qu'il n'existe pas
    update(@Body() input: UserInput, @Param() parameter: UserParam): Promise<User> {
        try {
            return this.service.update(input.firstname, input.lastname, input.age, parameter.id, input.password);
        }catch(DOMException) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Supprimer un utilisateur')
    @Delete(':id')
    @ApiCreatedResponse({
        description: 'The user has been successfully deleted.'
    })
    //supprimer un user et envoyer true s'il est supprimer
    //envyer false si une contrainte de clé à echoué sinon
    async supprimer(@Param() parameter: UserParam): Promise<Boolean> {
        try {
            return this.service.supprimer(+parameter.id);  
        }catch(DOMException) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag
    @ApiTags('getting all the roles of a user')
    @Get(':id/roles')
    @ApiCreatedResponse({
        description: 'The roles has been successfully founded.'
    })
    //recuperer la liste des roles d'un user
    //envoyer la liste vide s'il n'a aucun role ou si le user n'existe pas
    async getRolesByUserId(@Param() parameter: UserParam): Promise<Role[]> {
        return this.RoleService.getRolesByUserId(+parameter.id);   
    }

}