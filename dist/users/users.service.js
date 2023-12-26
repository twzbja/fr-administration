"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                id: 0,
                lastname: 'Doe',
                firstname: 'John',
                age: 23
            }
        ];
    }
    create(lastname, firstname, age) {
        const newUser = new user_entity_1.User(this.users.length + 1, lastname, firstname, age);
        this.users.push(newUser);
        return newUser;
    }
    getAll() {
        return this.users;
    }
    getById(id) {
        return this.users.find(user => user.id === +id);
    }
    updateById(id, input) {
        const userToUpdate = this.users.find(user => user.id === +id);
        if (!userToUpdate) {
            return null;
        }
        if (input.lastname !== undefined) {
            userToUpdate.lastname = input.lastname;
        }
        if (input.firstname !== undefined) {
            userToUpdate.firstname = input.firstname;
        }
        return userToUpdate;
    }
    deleteById(id) {
        const index = this.users.findIndex(user => user.id === +id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map