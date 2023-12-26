import { Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './associations.entity';

@Injectable()
export class AssociationsService {
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
        const association = this.associations.find(a => a.id === id);
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }

    // Créer une nouvelle association
    createAssociation(id: number, idUsers: number[], name: string): Association {
        const newAssociation = new Association(id, idUsers, name);
        this.associations.push(newAssociation);
        return newAssociation;
    }

    // Mettre à jour une association par son ID
    updateAssociationById(id: number, updatedAssociation: Association): Association {
        const index = this.associations.findIndex(a => a.id === id);
        if (index === -1) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        this.associations[index] = { ...this.associations[index], ...updatedAssociation };
        return this.associations[index];
    }

    // Supprimer une association par son ID
    deleteAssociationById(id: number): boolean {
        const index = this.associations.findIndex(a => a.id === id);
        if (index === -1) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        this.associations.splice(index, 1);
        return true;
    }

    // Récupérer les membres d'une association par son ID
    getMembersByAssociationId(id: number): number[] {
        const association = this.getAssociationById(id);
        return association.idUsers;
    }
}
