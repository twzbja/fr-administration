import { Controller, Get, Body, Post, Param, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AssociationInput } from './AssociationInput.entity';
import { AssociationParam } from './AssociationParam.entity';
import { AssociationDTO } from './association.dto';
import { Member } from './association.member';
import { Minute } from 'src/minutes/minute.entity';
import { MinutesService } from 'src/minutes/minutes.service';
import { User } from 'src/users/user.entity';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    
    constructor(
        private service: AssociationsService,
        private MinuteService:MinutesService
    ) {}
    
    //Regroupement sous le tag
    //envoyer toutes les association dtos sinon une liste vide
    @ApiTags('Recuperer une/des association(s)')
    @Get()
    async getAll(): Promise<AssociationDTO[]> {
        return this.service.getAll();
    }

    //Regroupement sous le tag
    @ApiTags('Recuperer une/des association(s)')
    @Get(':id')
    //envoyer une association dto a partir de son id sinon une exeption
    getById(@Param() parameter: AssociationParam): Promise<AssociationDTO> {
        try {
            return this.service.getAssociationDTOById(+parameter.id);   
        }catch(DOMException) {
            throw new HttpException(`Could not find an Association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Recuperer les membres d une associations')
    @Get(':id/members')
    //envoyer la liste des membres d'une association ou une liste vide eventuellemnt
    //envoyer une exeption si l'association n'est pas trouvé
    getMembers(@Param() parameter: AssociationParam): Promise<Member[]> {
    try {
        return this.service.getMembers(+parameter.id);
    }catch(DOMException){
        throw new HttpException(`Could not find a the association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Cree une association')
    @Post()
    @ApiCreatedResponse({
        description: 'The association has been successfully created.'
    })
    //creer une association et la renvoyer sion une exeption si les param sont incorrectes: si les id des users sont incorrectes
    create(@Body() input: AssociationInput): Promise<Association> {
        try {
            return this.service.create(input.name, input.idUsers);
        } catch (DOMException) {
            throw new HttpException(`wrong body parameters : the users may not exist , see .../api to correct it`, HttpStatus.BAD_REQUEST);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Mettre à jour une association')
    @Put(':id')
    //mettre à jour une association et la revoyer sinon envoyer une exeption si l'association n'existe pas
    update(@Body() input: AssociationInput, @Param() parameter: AssociationParam): Promise<Association> {
        try {
            return this.service.update(input.idUsers, input.name, parameter.id);
        } catch (DOMException) {
            throw new HttpException(`cool not find association with association id = ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag Supprimer une association dans notre BD
    @ApiTags('Supprimer une association')
    @Delete(':id')
    //supprimer une association et envoyer true sinon false si contrainte de clée echouée 
    //envoyer exeption si l'association n'existe pas
    supprimer(@Param() parameter: AssociationParam): Promise<Boolean> {
        try {
            return this.service.supprimer(parameter.id);
        } catch (DOMException) {
            throw new HttpException(`could not find association with association id = ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
    }

    //Regroupement sous le tag
    @ApiTags('obtention de tous les proces verbaux pour une association')
    @Get(':id/minutes')
    @ApiCreatedResponse({
        description: 'The roles has been successfully founded.'
    })

    //recuperer la liste des proces verbaux triés par date ou une liste vide eventuellement si
    //l'association n'exite pas ou si elle n'a pas de minutes
    async getMinuteByAssociationId(@Param() parameter: AssociationParam): Promise<Minute[]> {
        return this.MinuteService.getMinuteByAssociationId(+parameter.id);   
    }
}