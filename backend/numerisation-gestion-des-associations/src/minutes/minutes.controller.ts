import { Controller, Get, Body, Post, Param, HttpException, HttpStatus, Put, Delete, NotFoundException } from '@nestjs/common';
import { Minute } from './minute.entity';
import { MinutesService } from './minutes.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { MinuteInput } from './MinuteInput.entity';
import { MinuteUpdate } from './MinuteUpdate.entity';
import { MinuteParam } from './MinuteParam.entity';
import { User } from 'src/users/user.entity';

@ApiTags('minutes')
@Controller('minutes')
export class MinutesController {

    constructor(
        private service: MinutesService
    ) {}

    //Regroupement sous le tag
    @ApiTags('Recuperer une/des minute(s)')
    @Get()
    //envoyer la liste des minutes ou eventuellement la liste vide
    async getAll(): Promise<Minute[]> {
        return await this.service.getAll();
    }

    //Regroupement sous le tag
    @ApiTags('Recuperer une/des minute(s)')
    @Get(':id')
    //envoyer une minute sinon une exeption
    async getById(@Param() parameter: MinuteParam): Promise<Minute>{
        let ptr=await this.service.getById(parameter.id );
        if(ptr===null){
            throw new HttpException(`Could not find a minute with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        else{
            return this.service.getById(parameter.id);
        }
    }

    //Regroupement sous le tag
    @ApiTags('Cree une minute')
    @Post()
    @ApiCreatedResponse({
        description: 'The minute has been successfully created.'
    })
    //creer une minute et la renvoyer sinon une exception
    async create(@Body() input: MinuteInput): Promise<Minute> {
        let ptr = await this.service.create(input.content, input.date, +input.idAssociation, input.idVoters);
        if (ptr===null) {
            throw new HttpException(`wrong body parameters , could not create minuite with given parameters the association or users may not existe`, HttpStatus.BAD_REQUEST);
        } else {
            return ptr ;
        }
    }

    //Regroupement sous le tag Mettre à jour une minute dans notre BD
    @ApiTags('Mettre à jour une minute')
    @Put(':id')
    //mettre à jour une minute et la renvoyer sinon envoyer une exeption
    async update(@Body() input: MinuteUpdate, @Param() parameter: MinuteParam): Promise<Minute> {
        let ptr = await this.service.update(input.content, input.idVoters, +input.idAssociation, input.date, +parameter.id);
        if (ptr===null) {
            throw new HttpException(`could not update association because of bad parameters; the association or the minute may not exist`, HttpStatus.BAD_REQUEST);
        } else {
            return ptr ;
        }
    }

    //Regroupement sous le tag Supprimer une minute dans notre BD
    @ApiTags('Supprimer une minute')
    @Delete(':id')
    async delete(@Param() parameter: MinuteParam): Promise<Boolean> {
        let ptr = await this.service.supprimer(parameter.id);
        if (ptr===null) {
            throw new HttpException(`could not find minute with id = ${parameter.id}`, HttpStatus.NOT_FOUND);
        } else {
            return ptr ;
        }
    }


    //la liste des users d'une minute
    @Get(':id/users')
    //envoyer une minute sinon une exeption
    async getUsersByMinute(@Param() parameter: MinuteParam): Promise<User[]> {
        let ptr = await this.service.getUsersByMinuteId(+parameter.id);
        if(ptr===null){
            throw new HttpException(`could not find minute with id = ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        else{
            return ptr;
        }
    }
}
