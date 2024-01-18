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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const roles_service_1 = require("../roles/roles.service");
const association_member_1 = require("../associations/association.member");
let UsersService = class UsersService {
    constructor(UsersRepository, RoleService) {
        this.UsersRepository = UsersRepository;
        this.RoleService = RoleService;
    }
    async getAll() {
        return await this.UsersRepository.find();
    }
    async getById(id) {
        let ptr = await this.UsersRepository.findOneBy({ id: id });
        if (ptr != undefined) {
            return ptr;
        }
        else {
            throw new DOMException("user avec id= " + id + " non trouvé");
        }
    }
    async create(nom, prenom, age, password) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const newUser = await this.UsersRepository.create({
            lastname: prenom,
            firstname: nom,
            age: age,
            password: hash
        });
        try {
            await this.UsersRepository.save(newUser);
            return (newUser);
        }
        catch (error) {
            throw new DOMException("param incomplet ou incorrect");
        }
    }
    async update(nom, prenom, age, id, password) {
        let user = await this.getById(id);
        if (user != undefined) {
            if (prenom !== undefined) {
                user.lastname = prenom;
            }
            if (nom !== undefined) {
                user.firstname = nom;
            }
            if (age !== undefined) {
                user.age = age;
            }
            if (password !== undefined) {
                user.password = password;
            }
            return await this.UsersRepository.save(user);
        }
        else {
            throw new DOMException("user avec id = " + id + " non trouvé");
        }
    }
    async supprimer(id) {
        let user = await this.getById(id);
        try {
            this.UsersRepository.remove(user);
            return true;
        }
        catch (error) {
            return (false);
        }
    }
    async getUsersByRoleName(role_name) {
        let listUser = [];
        let listRole = await this.RoleService.getRoleByRoleName(role_name);
        if (listRole != undefined) {
            for (let i = 0; i < listRole.length; i++) {
                let id = listRole[i].idUser;
                let user = await this.getById(id);
                listUser.push(new association_member_1.Member(user, role_name));
            }
        }
        return (listUser);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map