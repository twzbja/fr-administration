"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const minutes_module_1 = require("../minutes/minutes.module");
const roles_module_1 = require("../roles/roles.module");
const users_module_1 = require("../users/users.module");
const association_entity_1 = require("./association.entity");
const associations_controller_1 = require("./associations.controller");
const associations_service_1 = require("./associations.service");
let AssociationsModule = class AssociationsModule {
};
AssociationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([association_entity_1.Association]), users_module_1.UsersModule, roles_module_1.RolesModule, (0, common_1.forwardRef)(() => minutes_module_1.MinutesModule)],
        controllers: [associations_controller_1.AssociationsController],
        providers: [associations_service_1.AssociationsService],
        exports: [associations_service_1.AssociationsService]
    })
], AssociationsModule);
exports.AssociationsModule = AssociationsModule;
//# sourceMappingURL=associations.module.js.map