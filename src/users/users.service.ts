import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    private users: User[] = [
        {
            id: 0,
            lastname: 'Doe',
            firstname: 'John',
            age: 23
        }
    ];

// Créer
     create(lastname: string, firstname: string, age: number): User {
        const newUser = new User(this.users.length, lastname, firstname, age); // Gestion de l'ID (auto-incrémentation)
        this.users.push(newUser); // Ajout de l'utilisateur à la "base de données"
        return newUser; // Retourne le nouvel utilisateur créé
    }


// Récupérer
    
    getAll(): User[] {
        return this.users; // Renvoie tous les utilisateurs
    }

    
    getById(id: number): User {
        return this.users.find(user => user.id === +id); // Renvoie l'utilisateur correspondant à l'ID
    }

// Mettre à jour
    
    updateById(id: number, input: Partial<User>): User {
    const userToUpdate = this.users.find(user => user.id === +id); // Récupère l'utilisateur à mettre à jour
    if (!userToUpdate) {
      return null; // Si l'utilisateur n'est pas trouvé, retourne null ou un code d'erreur approprié
    }

    // Met à jour le nom et le prénom si les valeurs sont fournies dans l'input
    if (input.lastname !== undefined) {
      userToUpdate.lastname = input.lastname;
    }
    if (input.firstname !== undefined) {
      userToUpdate.firstname = input.firstname;
    }

    return userToUpdate; // Retourne l'utilisateur mis à jour
    }

// Effacer
    deleteById(id: number): boolean {
    const index = this.users.findIndex(user => user.id === +id); // Recherche l'index de l'utilisateur à supprimer
    if (index === -1) {
        return false; // Gestion de l'erreur 404 si l'utilisateur n'est pas trouvé         
    }

    this.users.splice(index, 1); // Supprime l'utilisateur du tableau
    return true; // Retourne true pour indiquer que la suppression s'est bien passée
    }
}
