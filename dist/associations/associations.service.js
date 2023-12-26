"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const associations_entity_1 = require("./associations.entity");
let AssociationsService = class AssociationsService {
    constructor() {
        this.associations = [
            {
                id: 1,
                idUsers: [1, 2, 3],
                name: 'Sample Association'
            }
        ];
    }
    getAllAssociations() {
        return this.associations;
    }
    getAssociationById(id) {
        const association = this.associations.find(a => a.id === id);
        if (!association) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }
    createAssociation(id, idUsers, name) {
        const newAssociation = new associations_entity_1.Association(id, idUsers, name);
        this.associations.push(newAssociation);
        return newAssociation;
    }
    updateAssociationById(id, updatedAssociation) {
        const index = this.associations.findIndex(a => a.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        this.associations[index] = { ...this.associations[index], ...updatedAssociation };
        return this.associations[index];
    }
    deleteAssociationById(id) {
        const index = this.associations.findIndex(a => a.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        this.associations.splice(index, 1);
        return true;
    }
    getMembersByAssociationId(id) {
        const association = this.getAssociationById(id);
        return association.idUsers;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)()
], AssociationsService);
//# sourceMappingURL=associations.service.js.map