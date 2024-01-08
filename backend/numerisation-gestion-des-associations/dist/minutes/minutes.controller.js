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
exports.MinutesController = void 0;
const common_1 = require("@nestjs/common");
const minutes_service_1 = require("./minutes.service");
const swagger_1 = require("@nestjs/swagger");
const MinuteInput_entity_1 = require("./MinuteInput.entity");
const MinuteUpdate_entity_1 = require("./MinuteUpdate.entity");
const MinuteParam_entity_1 = require("./MinuteParam.entity");
let MinutesController = class MinutesController {
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.getAll();
    }
    async getById(parameter) {
        let ptr = await this.service.getById(parameter.id);
        if (ptr === null) {
            throw new common_1.HttpException(`Could not find a minute with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return this.service.getById(parameter.id);
        }
    }
    async create(input) {
        let ptr = await this.service.create(input.content, input.date, +input.idAssociation, input.idVoters);
        if (ptr === null) {
            throw new common_1.HttpException(`wrong body parameters , could not create minuite with given parameters the association or users may not existe`, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return ptr;
        }
    }
    async update(input, parameter) {
        let ptr = await this.service.update(input.content, input.idVoters, +input.idAssociation, input.date, +parameter.id);
        if (ptr === null) {
            throw new common_1.HttpException(`could not update association because of bad parameters; the association or the minute may not exist`, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return ptr;
        }
    }
    async delete(parameter) {
        let ptr = await this.service.supprimer(parameter.id);
        if (ptr === null) {
            throw new common_1.HttpException(`could not find minute with id = ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return ptr;
        }
    }
    async getUsersByMinute(parameter) {
        let ptr = await this.service.getUsersByMinuteId(+parameter.id);
        if (ptr === null) {
            throw new common_1.HttpException(`could not find minute with id = ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return ptr;
        }
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Recuperer une/des minute(s)'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MinutesController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Recuperer une/des minute(s)'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MinuteParam_entity_1.MinuteParam]),
    __metadata("design:returntype", Promise)
], MinutesController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiTags)('Cree une minute'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The minute has been successfully created.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MinuteInput_entity_1.MinuteInput]),
    __metadata("design:returntype", Promise)
], MinutesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('Mettre à jour une minute'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MinuteUpdate_entity_1.MinuteUpdate, MinuteParam_entity_1.MinuteParam]),
    __metadata("design:returntype", Promise)
], MinutesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('Supprimer une minute'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MinuteParam_entity_1.MinuteParam]),
    __metadata("design:returntype", Promise)
], MinutesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/users'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MinuteParam_entity_1.MinuteParam]),
    __metadata("design:returntype", Promise)
], MinutesController.prototype, "getUsersByMinute", null);
MinutesController = __decorate([
    (0, swagger_1.ApiTags)('minutes'),
    (0, common_1.Controller)('minutes'),
    __metadata("design:paramtypes", [minutes_service_1.MinutesService])
], MinutesController);
exports.MinutesController = MinutesController;
//# sourceMappingURL=minutes.controller.js.map