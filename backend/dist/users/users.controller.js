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
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const UserInput_entity_1 = require("./UserInput.entity");
const UserParam_entity_1 = require("./UserParam.entity");
const roles_service_1 = require("../roles/roles.service");
let UsersController = class UsersController {
    constructor(service, RoleService) {
        this.service = service;
        this.RoleService = RoleService;
    }
    async getAll() {
        return this.service.getAll();
    }
    async getById(parameter) {
        try {
            return this.service.getById(+parameter.id);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async create(input) {
        try {
            return this.service.create(input.firstname, input.lastname, input.age, input.password);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`wrong body parameters, go to /api to check the correct parmeters`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    update(input, parameter) {
        try {
            return this.service.update(input.firstname, input.lastname, input.age, parameter.id, input.password);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async supprimer(parameter) {
        try {
            return this.service.supprimer(+parameter.id);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getRolesByUserId(parameter) {
        return this.RoleService.getRolesByUserId(+parameter.id);
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Recuperer un/des utilisateur(s)'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Recuperer un/des utilisateur(s)'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully founded.'
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserParam_entity_1.UserParam]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiTags)('Creer un utilisateur'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully created.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_entity_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('Mettre à jour un utilisateur'),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully updated.'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_entity_1.UserInput, UserParam_entity_1.UserParam]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('Supprimer un utilisateur'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully deleted.'
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserParam_entity_1.UserParam]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "supprimer", null);
__decorate([
    (0, swagger_1.ApiTags)('getting all the roles of a user'),
    (0, common_1.Get)(':id/roles'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The roles has been successfully founded.'
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserParam_entity_1.UserParam]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getRolesByUserId", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        roles_service_1.RolesService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map