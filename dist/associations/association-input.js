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
exports.AssociationInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const associations_entity_1 = require("./associations.entity");
class AssociationInput {
}
exports.AssociationInput = AssociationInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the association',
        example: "Association Name",
        type: String,
    }),
    __metadata("design:type", String)
], AssociationInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An array of user IDs associated with the association',
        example: [1, 2, 3],
        type: () => associations_entity_1.Association,
    }),
    __metadata("design:type", Array)
], AssociationInput.prototype, "users", void 0);
//# sourceMappingURL=association-input.js.map