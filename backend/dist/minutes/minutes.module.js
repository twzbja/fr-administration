"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinutesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const associations_module_1 = require("../associations/associations.module");
const users_module_1 = require("../users/users.module");
const minute_entity_1 = require("./minute.entity");
const minutes_controller_1 = require("./minutes.controller");
const minutes_service_1 = require("./minutes.service");
let MinutesModule = class MinutesModule {
};
MinutesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([minute_entity_1.Minute]), (0, common_1.forwardRef)(() => associations_module_1.AssociationsModule), users_module_1.UsersModule],
        controllers: [minutes_controller_1.MinutesController],
        providers: [minutes_service_1.MinutesService],
        exports: [minutes_service_1.MinutesService]
    })
], MinutesModule);
exports.MinutesModule = MinutesModule;
//# sourceMappingURL=minutes.module.js.map