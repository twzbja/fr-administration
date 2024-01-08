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
exports.AssociationsController = void 0;
const common_1 = require("@nestjs/common");
const associations_service_1 = require("./associations.service");
const swagger_1 = require("@nestjs/swagger");
const AssociationInput_entity_1 = require("./AssociationInput.entity");
const AssociationParam_entity_1 = require("./AssociationParam.entity");
const minutes_service_1 = require("../minutes/minutes.service");
let AssociationsController = class AssociationsController {
    constructor(service, MinuteService) {
        this.service = service;
        this.MinuteService = MinuteService;
    }
    async getAll() {
        return this.service.getAll();
    }
    getById(parameter) {
        try {
            return this.service.getAssociationDTOById(+parameter.id);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`Could not find an Association with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    getMembers(parameter) {
        try {
            return this.service.getMembers(+parameter.id);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`Could not find a the association with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    create(input) {
        try {
            return this.service.create(input.name, input.idUsers);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`wrong body parameters : the users may not exist , see .../api to correct it`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    update(input, parameter) {
        try {
            return this.service.update(input.idUsers, input.name, parameter.id);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`cool not find association with association id = ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    supprimer(parameter) {
        try {
            return this.service.supprimer(parameter.id);
        }
        catch (DOMException) {
            throw new common_1.HttpException(`could not find association with association id = ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getMinuteByAssociationId(parameter) {
        return this.MinuteService.getMinuteByAssociationId(+parameter.id);
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Recuperer une/des association(s)'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Recuperer une/des association(s)'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociationParam_entity_1.AssociationParam]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiTags)('Recuperer les membres d une associations'),
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociationParam_entity_1.AssociationParam]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
__decorate([
    (0, swagger_1.ApiTags)('Cree une association'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The association has been successfully created.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociationInput_entity_1.AssociationInput]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('Mettre à jour une association'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociationInput_entity_1.AssociationInput, AssociationParam_entity_1.AssociationParam]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('Supprimer une association'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociationParam_entity_1.AssociationParam]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "supprimer", null);
__decorate([
    (0, swagger_1.ApiTags)('obtention de tous les proces verbaux pour une association'),
    (0, common_1.Get)(':id/minutes'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The roles has been successfully founded.'
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociationParam_entity_1.AssociationParam]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMinuteByAssociationId", null);
AssociationsController = __decorate([
    (0, swagger_1.ApiTags)('associations'),
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService,
        minutes_service_1.MinutesService])
], AssociationsController);
exports.AssociationsController = AssociationsController;
//# sourceMappingURL=associations.controller.js.map