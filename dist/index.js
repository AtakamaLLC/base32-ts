"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoder_1 = __importDefault(require("./encoder"));
const Encoding = __importStar(require("./encoding"));
const decoder_1 = __importDefault(require("./decoder"));
class Base32 {
    constructor(encoding = Encoding.base32_js) {
        this.encoding = encoding;
    }
    makeEncoder() {
        return new encoder_1.default(this.encoding);
    }
    makeDecoder(buffer_encoding) {
        return new decoder_1.default(this.encoding, buffer_encoding);
    }
    encode(data) {
        const encoder = this.makeEncoder();
        return encoder.update(data, true);
    }
    decode(data, buffer_encoding = "utf8") {
        if (buffer_encoding === undefined) {
            buffer_encoding = "utf8";
        }
        const decoder = this.makeDecoder(buffer_encoding);
        return decoder.update(data, true);
    }
}
exports.default = Base32;
//# sourceMappingURL=index.js.map