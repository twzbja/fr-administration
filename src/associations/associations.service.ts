import { Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class AssociationsService {

    constructor(
        private userService: UsersService,
        @InjectRepository(Association)
        private associationRepository: Repository<Association>,
    ) {}

    // Récupérer toutes les associations
    public async getAllAssociations(): Promise<Association[]> {
        return this.associationRepository.find();
    }

    // Récupérer une association par son ID
    public async getAssociationById(id: number): Promise<Association> {
        const association = await this.associationRepository.findOne({where : {id}});
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }

    // Créer une nouvelle association
    public async createAssociation(idUsers: number[], name: string): Promise<Association> {
        const users: User[] = [];
        
        // Récupérer chaque utilisateur correspondant à son ID
        for (const userId of idUsers) {
            const user = await this.userService.getById(userId);
            if (!user) {
                throw new NotFoundException(`Utilisateur avec l'ID ${userId} introuvable`);
            }
            users.push(user); // Ajouter l'utilisateur à la liste
        }

        const newAssociation = new Association();
        newAssociation.users = users; // Assigner la liste d'utilisateurs récupérés
        newAssociation.name = name; // Définir le nom de l'association

        return this.associationRepository.save(newAssociation);
    }


    // Mettre à jour une association par son ID
    public async updateAssociationById(id: number, updatedAssociation: Association): Promise<Association> {
        const association = await this.getAssociationById(id);
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        
        await this.associationRepository.update(id, updatedAssociation);
        return this.getAssociationById(id);
    }

    // Supprimer une association par son ID
    public async deleteAssociationById(id: number): Promise<boolean> {
        const association = await this.getAssociationById(id);
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        
        await this.associationRepository.delete(id);
        return true;
    }

    // Récupérer les membres d'une association par son ID
    public async getMembersByAssociationId(id: number): Promise<number[]> {
        const association = await this.getAssociationById(id);
        const userIds: number[] = association.users.map(user => user.id);
        return userIds;
    }

}
