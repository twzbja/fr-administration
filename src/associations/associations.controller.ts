import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
import { ApiTags } from '@nestjs/swagger';
import { AssociationInput } from './association-input';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(private readonly associationsService: AssociationsService) {}

    @Get()
    async getAllAssociations(): Promise<Association[]> {
        return await this.associationsService.getAllAssociations();
    }

    @Get(':id')
    async getAssociationById(@Param('id') id: number): Promise<Association> {
        const association = await this.associationsService.getAssociationById(id);
        if (!association) {
            throw new HttpException(`Association with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return association;
    }

    @Post()
    async createAssociation(@Body() input: AssociationInput): Promise<Association> {
        const { users, name } = input;
        
        if (!users || users.length === 0) {
            // Gérer le cas où il n'y a pas d'utilisateurs
            // Peut-être renvoyer une erreur ou prendre une action appropriée
            throw new HttpException(`No user entered`, HttpStatus.NOT_FOUND);
        }
    
        const userIds: number[] = users.map(user => user.id);
    
        return await this.associationsService.createAssociation(userIds, name);
    }
    


    @Put(':id')
    async updateAssociationById(@Param('id') id: number, @Body() body: Association): Promise<Association> {
        return await this.associationsService.updateAssociationById(id, body);
    }

    @Delete(':id')
    async deleteAssociationById(@Param('id') id: number): Promise<boolean> {
        return await this.associationsService.deleteAssociationById(id);
    }

    @Get(':id/members')
    async getMembersByAssociationId(@Param('id') id: number): Promise<number[]> {
        return await this.associationsService.getMembersByAssociationId(id);
    }
}
