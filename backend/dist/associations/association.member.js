"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
class Member {
    constructor(user, role) {
        this.id = user.id;
        this.name = user.lastname;
        this.firstname = user.firstname;
        this.age = user.age;
        this.role = role;
    }
}
exports.Member = Member;
//# sourceMappingURL=association.member.js.map