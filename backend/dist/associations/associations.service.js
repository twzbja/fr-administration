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
const association_entity_1 = require("./association.entity");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const association_member_1 = require("./association.member");
const roles_service_1 = require("../roles/roles.service");
const association_dto_1 = require("./association.dto");
let AssociationsService = class AssociationsService {
    constructor(AssociationRepostitory, service, roleService) {
        this.AssociationRepostitory = AssociationRepostitory;
        this.service = service;
        this.roleService = roleService;
    }
    async getAll() {
        let assoclist = await this.AssociationRepostitory.find();
        let dtolist = this.mapAssociationDTO(assoclist);
        return (dtolist);
    }
    async getMembers(id) {
        let assoc = await this.getById(id);
        let members = this.mapMembers(id, await assoc.users);
        return (members);
    }
    async getById(id) {
        try {
            return await this.AssociationRepostitory.findOneBy({ id });
        }
        catch (error) {
            return null;
        }
    }
    async update(idUsers, name, id) {
        let assoc = await this.getById(id);
        if (idUsers !== undefined) {
            for (let i = 0; i < idUsers.length; i++) {
                (await assoc.users)[i] = (await this.service.getById(idUsers[i]));
            }
        }
        if (name !== undefined) {
            assoc.name = name;
        }
        return await this.AssociationRepostitory.save(assoc);
    }
    async supprimer(id) {
        try {
            let assoc = await this.getById(id);
            await this.AssociationRepostitory.remove(assoc);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async create(nom, idUsers) {
        const tabl = this.AssociationRepostitory.create({
            name: nom
        });
        if (idUsers) {
            for (let i = 0; i < idUsers.length; i++) {
                (await tabl.users)[i] = (await this.service.getById(idUsers[i]));
            }
        }
        await this.AssociationRepostitory.save(tabl);
        return (tabl);
    }
    async mapMember(id_association, user) {
        let role = await this.roleService.getById(user.id, id_association);
        let name = "";
        if (role != undefined) {
            name = role.name;
        }
        let member = new association_member_1.Member(user, name);
        return (member);
    }
    async mapMembers(id_association, user) {
        let members = [];
        for (let i = 0; i < user.length; i++) {
            let ptr = user[i];
            members.push(await this.mapMember(id_association, ptr));
        }
        return (members);
    }
    async mapAssociationDTO(list_association) {
        let list_association_dto = [];
        for (let i = 0; i < list_association.length; i++) {
            let association = list_association[i];
            let members = this.mapMembers(association.id, await association.users);
            let associationdto = new association_dto_1.AssociationDTO(association.id, association.name, await members);
            list_association_dto.push(associationdto);
        }
        return (list_association_dto);
    }
    async getAssociationDTOById(id) {
        const association = await this.getById(id);
        return {
            id: association.id,
            name: association.name,
            members: await this.getMembers(association.id),
            minutes: association.minutes,
        };
    }
    async updateAssocWithObjet(association) {
        await this.AssociationRepostitory.save(association);
    }
};
AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(association_entity_1.Association)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        roles_service_1.RolesService])
], AssociationsService);
exports.AssociationsService = AssociationsService;
//# sourceMappingURL=associations.service.js.map