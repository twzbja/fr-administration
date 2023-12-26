import { Controller, Get, Post, Put, Delete, Inject, HttpException, HttpStatus, Body, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

// La création
    @Post()
    create(@Body() input: Partial<User>): User {
        try {
            const { lastname, firstname, age } = input;
            if (!lastname || !firstname || !age) {
                throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
            }

            return this.usersService.create(input.lastname, input.firstname, input.age);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

// Récupérer tout
    @Get()
    getAll(): User[] {
        return this.usersService.getAll();
    }

// Recupérer un élément
    @Get(':id')
    getById(@Param('id') id: number): User {
        try {
            const user = this.usersService.getById(id);
            if (!user) {
                throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//Mise à jour
    @Put(':id')
    updateById(@Param('id') id: number, @Body() input: Partial<User>): User {
        try {
            const user = this.usersService.updateById(id, input);
            if (!user) {
                throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

// Supprimer
    @Delete(':id')
    deleteById(@Param('id') id: number): boolean {
     /*   try {
            const user = this.usersService.deleteById(id);
            if (!user) {
                throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    */
   return this.usersService.deleteById(id);
    }
}
