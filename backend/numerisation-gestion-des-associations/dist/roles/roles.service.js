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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./role.entity");
let RolesService = class RolesService {
    constructor(RoleRepostitory) {
        this.RoleRepostitory = RoleRepostitory;
    }
    async getById(id_user, id_association) {
        let listrole = await this.getAllRoleUserAssociation(id_user, id_association);
        return (listrole[0]);
    }
    async update(id_user, id_association, name) {
        let role = await this.getById(id_user, id_association);
        if (role != undefined) {
            role.name = name;
            return await this.RoleRepostitory.save(role);
        }
        else {
            throw new DOMException("role non trouvé");
        }
    }
    async delete(id_user, id_association) {
        let listrole = await this.getById(id_user, id_association);
        if (listrole == undefined) {
            throw new DOMException(' role non trouvé ');
        }
        if (this.RoleRepostitory.remove(listrole)) {
            return (true);
        }
        return (false);
    }
    async create(id_user, id_association, name_role) {
        const role = this.RoleRepostitory.create({
            idUser: id_user,
            idAssociation: id_association,
            name: name_role
        });
        try {
            await this.RoleRepostitory.save(role);
            return (role);
        }
        catch (error) {
            throw new DOMException("impossible de creer ce role car contrainte key fail");
        }
    }
    async getAllRole() {
        return await this.RoleRepostitory.find();
    }
    async getAllRoleAssociation(id_association) {
        return await this.RoleRepostitory.find({
            where: {
                idAssociation: id_association
            }
        });
    }
    async getRolesByUserId(id_user) {
        return await this.RoleRepostitory.find({
            where: {
                idUser: id_user
            }
        });
    }
    async getAllRoleUserAssociation(id_user, id_association) {
        return await this.RoleRepostitory.find({
            where: {
                idUser: id_user,
                idAssociation: id_association
            }
        });
    }
    async getRoleByRoleName(role_name) {
        return await this.RoleRepostitory.find({
            where: {
                name: role_name
            }
        });
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map