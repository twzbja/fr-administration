import { Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AssociationsService {

    constructor(
        private service: UsersService
    ) {}

    private associations: Association[] = [
        {
            id: 1,
            idUsers: [1, 2, 3],
            name: 'Sample Association'
        }
    ];

    // Récupérer toutes les associations
    getAllAssociations(): Association[] {
        return this.associations;
    }

    // Récupérer une association par son ID
    getAssociationById(id: number): Association {
        const association = this.associations.find(a => a.id === +id);
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }

    // Créer une nouvelle association
/*
    createAssociation( idUsers: number[], name: string): Association {
        const newAssociation = new Association(this.associations.length+1, idUsers, name);
        this.associations.push(newAssociation);
        return newAssociation;
    }
*/  
    async createAssociation(idUsers: number[], name: string): Promise<Association> {
        // Vérifiez l'existence de chaque utilisateur avant de créer l'association
        for (const userId of idUsers) {
            
            const userExists = await this.service.getById(userId);
            if (!userExists) {
                throw new NotFoundException(`Utilisateur avec l'ID ${userId} introuvable`);
            }
        }

        // Créez votre nouvelle association une fois que vous avez vérifié l'existence des utilisateurs
        const newAssociation = new Association(this.associations.length + 1, idUsers, name);
        this.associations.push(newAssociation);
        return Promise.resolve(newAssociation); // Retourne la nouvelle association dans une promesse
    }


    // Mettre à jour une association par son ID
    updateAssociationById(id: number, updatedAssociation: Association): Association {
        const index = this.associations.findIndex(a => a.id === +id);
        if (index === -1) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        this.associations[index] = { ...this.associations[index], ...updatedAssociation };
        return this.associations[index];
    }

    // Supprimer une association par son ID
    deleteAssociationById(id: number): boolean {
        const index = this.associations.findIndex(a => a.id === +id);
        if (index === -1) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        this.associations.splice(index, 1);
        return true;
    }

    // Récupérer les membres d'une association par son ID
    getMembersByAssociationId(id: number): number[] {
        const association = this.getAssociationById(+id);
        return association.idUsers;
    }
}
