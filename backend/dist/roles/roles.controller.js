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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const role_input_1 = require("./role.input");
const role_update_1 = require("./role.update");
const roles_service_1 = require("./roles.service");
let RolesController = class RolesController {
    constructor(service, UserService) {
        this.service = service;
        this.UserService = UserService;
    }
    getById(parameter) {
        return this.service.getById(+parameter.idUser, +parameter.idAssociation);
    }
    create(input) {
        try {
            return this.service.create(input.idUser, input.idAssociation, input.name);
        }
        catch (DOMException) {
            throw new common_1.HttpException(` fail to create role with the couple (idUser,IdAssociation)=${input.idUser} ${input.idAssociation} the role may already existe or the user or association may not existe`, common_1.HttpStatus.CONFLICT);
        }
    }
    update(parameter, input) {
        try {
            return this.service.update(parameter.idUser, parameter.idAssociation, input.name);
        }
        catch (DOMException) {
            throw new common_1.HttpException(` fail to update the role with the couple (idUser,IdAssociation)=${parameter.idUser} ${parameter.idAssociation} the role  may note existe`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    supprimer(parameter) {
        try {
            return this.service.delete(parameter.idUser, parameter.idAssociation);
        }
        catch (DOMException) {
            throw new common_1.HttpException(` Role not find with the couple (idUser,IdAssociation)=${parameter.idUser} ${parameter.idAssociation}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUsersByRoleName(parameter) {
        return this.UserService.getUsersByRoleName(parameter.name);
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Recuperer les roles pour un user /dans une association '),
    (0, common_1.Get)(':idUser/:idAssociation/role'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_input_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiTags)('Creer un role'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The role has been successfully created.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_input_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('Mettre à jour un role'),
    (0, common_1.Put)(':idUser/:idAssociation'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_input_1.RoleInput, role_update_1.RoleUpdate]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('Supprimer un role'),
    (0, common_1.Delete)(':idUser/:idAssociaton'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_input_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "supprimer", null);
__decorate([
    (0, swagger_1.ApiTags)('getting all the user having a given role'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The users has been successfully founded.'
    }),
    (0, common_1.Get)('users/roles/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_input_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getUsersByRoleName", null);
RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService,
        users_service_1.UsersService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map