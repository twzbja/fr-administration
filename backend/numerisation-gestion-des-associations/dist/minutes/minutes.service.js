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
exports.MinutesService = void 0;
const common_1 = require("@nestjs/common");
const minute_entity_1 = require("./minute.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const associations_service_1 = require("../associations/associations.service");
const users_service_1 = require("../users/users.service");
let MinutesService = class MinutesService {
    constructor(MinuteRepostitory, serviceAssoc, serviceUser) {
        this.MinuteRepostitory = MinuteRepostitory;
        this.serviceAssoc = serviceAssoc;
        this.serviceUser = serviceUser;
    }
    async getAll() {
        return await this.MinuteRepostitory.find();
    }
    async getById(id) {
        let ptr = await this.MinuteRepostitory.findOne({
            where: { id },
        });
        if (ptr instanceof minute_entity_1.Minute) {
            return (ptr);
        }
        return null;
    }
    async update(content, idVoters, idAssoc, date, id) {
        try {
            let minute = await this.getById(id);
            if (content !== undefined) {
                minute.content = content;
            }
            if (date !== undefined) {
                minute.date = date;
            }
            if (idAssoc !== undefined) {
                minute.association = await this.serviceAssoc.getById(idAssoc);
                (await minute.idVoters).length = 0;
                if (idVoters !== undefined) {
                    let users = await minute.association.users;
                    for (let i = 0; i < users.length; i++) {
                        if (idVoters.includes(users[i].id)) {
                            (await minute.idVoters).push(users[i]);
                        }
                    }
                }
            }
            return await this.MinuteRepostitory.save(minute);
        }
        catch (error) {
            return null;
        }
    }
    async supprimer(id) {
        try {
            let minute = await this.getById(id);
            if (await this.MinuteRepostitory.remove(minute)) {
                return (true);
            }
            else {
                return (false);
            }
        }
        catch (error) {
            return null;
        }
    }
    async create(content, date, idAssoc, idVoters) {
        try {
            console.log("debut:");
            let minute = await this.MinuteRepostitory.create({
                content: content,
                date: date
            });
            let association = await this.serviceAssoc.getById(idAssoc);
            let users = await association.users;
            for (let i = 0; i < users.length; i++) {
                if (idVoters.includes(users[i].id))
                    (await minute.idVoters).push(users[i]);
            }
            minute.association = association;
            return await this.MinuteRepostitory.save(minute);
        }
        catch (error) {
            return null;
        }
    }
    async getMinuteByAssociationId(id_association) {
        return await this.MinuteRepostitory.find({
            where: {
                association: {
                    id: id_association
                }
            }
        });
    }
    async getUsersByMinuteId(id) {
        try {
            let minute = await this.getById(id);
            let uses = await minute.idVoters;
            return uses;
        }
        catch (error) {
            return null;
        }
    }
};
MinutesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(minute_entity_1.Minute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        associations_service_1.AssociationsService,
        users_service_1.UsersService])
], MinutesService);
exports.MinutesService = MinutesService;
//# sourceMappingURL=minutes.service.js.map