"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const association_entity_1 = require("./associations/association.entity");
const associations_module_1 = require("./associations/associations.module");
const user_entity_1 = require("./users/user.entity");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const role_entity_1 = require("./roles/role.entity");
const minutes_module_1 = require("./minutes/minutes.module");
const roles_module_1 = require("./roles/roles.module");
const minute_entity_1 = require("./minutes/minute.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'mydatabase.db',
                entities: [association_entity_1.Association, user_entity_1.User, minute_entity_1.Minute, role_entity_1.Role],
                synchronize: true,
            }),
            users_module_1.UsersModule, associations_module_1.AssociationsModule, auth_module_1.AuthModule, minutes_module_1.MinutesModule, roles_module_1.RolesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map