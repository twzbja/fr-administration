"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const users = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
];
let UsersController = class UsersController {
    create(input) {
        const { id, lastname, firstname } = input;
        const newUser = new user_entity_1.User(users.length + 1, lastname, firstname);
        users.push(newUser);
        return newUser;
    }
    getAll() {
        return users;
    }
    getById(id) {
        return users.find(user => user.id === +id);
    }
    updateById(id, input) {
        const userToUpdate = users.find(user => user.id === +id);
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
        const index = users.findIndex(user => user.id === +id);
        if (index === -1) {
            throw new common_1.HttpException(`Could not find a user with the id ${id}`, common_1.HttpStatus.NOT_FOUND);
        }
        users.splice(index, 1);
        return true;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", user_entity_1.User)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", user_entity_1.User)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", user_entity_1.User)
], UsersController.prototype, "updateById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Boolean)
], UsersController.prototype, "deleteById", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users')
], UsersController);
//# sourceMappingURL=users.controller.js.map