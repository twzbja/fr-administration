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
const associations_entity_1 = require("./associations.entity");
let AssociationsController = class AssociationsController {
    constructor(associationsService) {
        this.associationsService = associationsService;
    }
    async getAllAssociations() {
        return await this.associationsService.getAllAssociations();
    }
    async getAssociationById(id) {
        const association = await this.associationsService.getAssociationById(id);
        if (!association) {
            throw new common_1.HttpException(`Association with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return association;
    }
    async createAssociation(input) {
        const { users, name } = input;
        if (!users || users.length === 0) {
            throw new common_1.HttpException(`No user entered`, common_1.HttpStatus.NOT_FOUND);
        }
        const userIds = users.map(user => user.id);
        return await this.associationsService.createAssociation(userIds, name);
    }
    async updateAssociationById(id, body) {
        return await this.associationsService.updateAssociationById(id, body);
    }
    async deleteAssociationById(id) {
        return await this.associationsService.deleteAssociationById(id);
    }
    async getMembersByAssociationId(id) {
        return await this.associationsService.getMembersByAssociationId(id);
    }
};
exports.AssociationsController = AssociationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAllAssociations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAssociationById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "createAssociation", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, associations_entity_1.Association]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "updateAssociationById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "deleteAssociationById", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembersByAssociationId", null);
exports.AssociationsController = AssociationsController = __decorate([
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
//# sourceMappingURL=associations.controller.js.map