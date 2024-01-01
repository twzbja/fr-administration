import { Controller, Get, Post, Put, Delete, Inject, HttpException, HttpStatus, Body, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Create a user
    @Post()
    async create(@Body() input: Partial<User>): Promise<User> {
        try {
            const { lastname, firstname, age } = input;
            if (!lastname || !firstname || !age) {
                throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
            }

            return await this.usersService.create(input.lastname, input.firstname, +input.age);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all users
    @Get()
    async getAll(): Promise<User[]> {
        return await this.usersService.getAll();
    }

    // Get just one user by id
    @Get(':id')
    async getById(@Param('id') id: number): Promise<User> {
        try {
            const user = await this.usersService.getById(id);
            if (!user) {
                throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update the content of user
    @Put(':id')
    async updateById(@Param('id') id: number, @Body() input: Partial<User>): Promise<User> {
        try {
            const user = await this.usersService.updateById(id, input);
            if (!user) {
                throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a user
    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<boolean> {
        try {
            const userDeleted = await this.usersService.deleteById(id);
            if (!userDeleted) {
                throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return userDeleted;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
