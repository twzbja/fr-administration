import { Controller, Get, Post, Put, Delete, HttpException, HttpStatus, Body, Param } from '@nestjs/common';
import { User } from './user.entity';


const users : User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
]

@Controller('users')
export class UsersController {

// Envoyer
    @Post()
    create(@Body() input: Partial<User>): User {
        const { id, lastname, firstname } = input;
        const newUser = new User(users.length + 1, lastname, firstname); // Gestion de l'ID (auto-incrémentation)
        users.push(newUser); // Ajout de l'utilisateur à la "base de données"
        return newUser; // Retourne le nouvel utilisateur créé
    }

// Récupérer
    @Get()
    getAll(): User[] {
        return users; // Renvoie tous les utilisateurs
    }

    @Get(':id')
    getById(@Param('id') id: number): User {
        return users.find(user => user.id === +id); // Renvoie l'utilisateur correspondant à l'ID
    }

// Mettre à jour
    @Put(':id')
    updateById(@Param('id') id: number, @Body() input: Partial<User>): User {
    const userToUpdate = users.find(user => user.id === +id); // Récupère l'utilisateur à mettre à jour
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
    @Delete(':id')
    deleteById(@Param('id') id: number): boolean {
    const index = users.findIndex(user => user.id === +id); // Recherche l'index de l'utilisateur à supprimer
    if (index === -1) {
        throw new HttpException(`Could not find a user with the id ${id}`, HttpStatus.NOT_FOUND); // Gestion de l'erreur 404 si l'utilisateur n'est pas trouvé
    }

    users.splice(index, 1); // Supprime l'utilisateur du tableau
    return true; // Retourne true pour indiquer que la suppression s'est bien passée
    }
}
