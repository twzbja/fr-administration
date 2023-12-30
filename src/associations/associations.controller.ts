import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';

@Controller('associations')
export class AssociationsController {
    constructor(private readonly associationsService: AssociationsService) {}

    // Récupérer toutes les associations
    @Get()
    getAllAssociations(): Association[] {
        return this.associationsService.getAllAssociations();
    }

    // Récupérer une association par son ID
    @Get(':id')
    getAssociationById(@Param('id') id: number): Association {
        return this.associationsService.getAssociationById(id);
    }

    // Créer une nouvelle association
    @Post()
    async createAssociation(@Body() input: Partial<Association> ): Promise<Association> {
        const {idUsers, name } = input;
        return await this.associationsService.createAssociation(idUsers, name);
    }

    // Mettre à jour une association par son ID
    @Put(':id')
    updateAssociationById(@Param('id') id: number, @Body() body: Association): Association {
        return this.associationsService.updateAssociationById(id, body);
    }

    // Supprimer une association par son ID
    @Delete(':id')
    deleteAssociationById(@Param('id') id: number): boolean {
        return this.associationsService.deleteAssociationById(id);
    }

    // Récupérer les membres d'une association par son ID
    @Get(':id/members')
    getMembersByAssociationId(@Param('id') id: number): number[] {
        return this.associationsService.getMembersByAssociationId(id);
    }
}
