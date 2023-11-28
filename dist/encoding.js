"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geohash = exports.zbase32 = exports.base32 = exports.rfc4648 = exports.base32hex = exports.crockford = exports.base32_js = void 0;
const alphacodec_1 = __importDefault(require("./alphacodec"));
exports.base32_js = new alphacodec_1.default("0123456789abcdefghjkmnpqrtuvwxyz", {
    o: "0",
    i: "1",
    l: "1",
    s: "5",
});
exports.crockford = new alphacodec_1.default("0123456789ABCDEFGHJKMNPQRSTVWXYZ", {
    I: "1",
    L: "1",
    O: "0",
    U: "V",
});
exports.base32hex = new alphacodec_1.default("0123456789ABCDEFGHIJKLMNOPQRSTUV");
exports.rfc4648 = new alphacodec_1.default("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", {
    0: "O",
    1: "I",
    8: "B",
});
exports.base32 = exports.rfc4648;
exports.zbase32 = new alphacodec_1.default("ybndrfg8ejkmcpqxot1uwisza345h769");
exports.geohash = new alphacodec_1.default("0123456789bcdefghjkmnpqrstuvwxyz");
//# sourceMappingURL=encoding.js.map