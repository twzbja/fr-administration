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
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const associations_entity_1 = require("./associations.entity");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AssociationsService = class AssociationsService {
    constructor(userService, associationRepository) {
        this.userService = userService;
        this.associationRepository = associationRepository;
    }
    async getAllAssociations() {
        return this.associationRepository.find();
    }
    async getAssociationById(id) {
        const association = await this.associationRepository.findOne({ where: { id } });
        if (!association) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }
    async createAssociation(idUsers, name) {
        const users = [];
        for (const userId of idUsers) {
            const user = await this.userService.getById(userId);
            if (!user) {
                throw new common_1.NotFoundException(`Utilisateur avec l'ID ${userId} introuvable`);
            }
            users.push(user);
        }
        const newAssociation = new associations_entity_1.Association();
        newAssociation.users = users;
        newAssociation.name = name;
        return this.associationRepository.save(newAssociation);
    }
    async updateAssociationById(id, updatedAssociation) {
        const association = await this.getAssociationById(id);
        if (!association) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        await this.associationRepository.update(id, updatedAssociation);
        return this.getAssociationById(id);
    }
    async deleteAssociationById(id) {
        const association = await this.getAssociationById(id);
        if (!association) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        await this.associationRepository.delete(id);
        return true;
    }
    async getMembersByAssociationId(id) {
        const association = await this.getAssociationById(id);
        const userIds = association.users.map(user => user.id);
        return userIds;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(associations_entity_1.Association)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map