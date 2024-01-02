import { Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    // Créer une nouvelle association
    public async createAssociation(userIds: number[], name: string): Promise<Association> {
        // Récupérer tous les utilisateurs correspondant aux IDs fournis
        const users: User[] = [];
        const userIdsSet = new Set<number>(); // Utilisation d'un Set pour stocker les IDs uniques

        for (const userId of userIds) {
            const user = await this.userService.getById(userId);
            if (!user) {
                throw new NotFoundException(`Utilisateur avec l'ID ${userId} introuvable`);
            }
            console.log("Les différents id : " + userId);
            users.push(user);
            if (user.id !== undefined) {
                userIdsSet.add(user.id); // Ajouter l'ID à l'ensemble
            }
        }

        // Convertir l'ensemble en tableau d'IDs
        const userIdsArray = Array.from(userIdsSet);
        console.log("Les différents id : " + userIdsArray);

        // Récupérer les associations existantes qui contiennent TOUS les utilisateurs donnés
        const existingAssociations = await this.associationRepository
            .createQueryBuilder('association')
            .innerJoin('association.users', 'user')
            .where('user.id IN (:...userIds)', { userIds: userIdsArray })
            .groupBy('association.id')
            .having('COUNT(DISTINCT user.id) = :userCount', { userCount: userIdsArray.length })
            .getMany();

        if (existingAssociations.length > 0) {
            throw new Error('Une association existe déjà pour ces utilisateurs');
        }

        const newAssociation = new Association();
        newAssociation.users = users;
        newAssociation.name = name;

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
