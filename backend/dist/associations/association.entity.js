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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Association = void 0;
const minute_entity_1 = require("../minutes/minute.entity");
const role_entity_1 = require("../roles/role.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Association = class Association {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Association.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Association.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => user_entity_1.User),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Promise)
], Association.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => minute_entity_1.Minute, minute => minute.association),
    __metadata("design:type", Array)
], Association.prototype, "minutes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => role_entity_1.Role, role => role.idUser),
    (0, typeorm_1.JoinColumn)({ name: "id" }),
    __metadata("design:type", Promise)
], Association.prototype, "roles", void 0);
Association = __decorate([
    (0, typeorm_1.Entity)()
], Association);
exports.Association = Association;
//# sourceMappingURL=association.entity.js.map