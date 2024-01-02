import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    

    // Créer un nouvel utilisateur
    public async create(lastname: string, firstname: string, age: number): Promise<User> {
        const newUser = this.userRepository.create({ lastname, firstname, age });
        return this.userRepository.save(newUser);
    }

    // Récupérer tous les utilisateurs
    public async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Récupérer un utilisateur par son ID
    public async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          // Gérer le cas où l'utilisateur n'est pas trouvé
          return null;
        }
        return user;
    }

    // Mettre à jour un utilisateur par son ID
    public async updateById(id: number, input: Partial<User>): Promise<User> {
        const userToUpdate = await this.userRepository.findOne({ where: { id } });
        
        if (!userToUpdate) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        Object.assign(userToUpdate, input);
        return this.userRepository.save(userToUpdate);
    }

    // Supprimer un utilisateur par son ID
    public async deleteById(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected > 0;
    }
}
