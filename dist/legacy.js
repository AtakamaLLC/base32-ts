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
exports.sha1 = exports.Encoding = exports.AlphaCodec = exports.Decoder = exports.Encoder = exports.decode = exports.encode = void 0;
const encoder_1 = __importDefault(require("./encoder"));
exports.Encoder = encoder_1.default;
const alphacodec_1 = __importDefault(require("./alphacodec"));
exports.AlphaCodec = alphacodec_1.default;
const Encoding = __importStar(require("./encoding"));
exports.Encoding = Encoding;
const decoder_1 = __importDefault(require("./decoder"));
exports.Decoder = decoder_1.default;
const sha1_1 = __importDefault(require("./node/sha1"));
exports.sha1 = sha1_1.default;
function encode(data, base32_encoding = Encoding.base32_js) {
    const encoder = new encoder_1.default(base32_encoding);
    return encoder.update(data, true);
}
exports.encode = encode;
function decode(data, base32_encoding = Encoding.base32_js, buffer_encoding = "utf8") {
    if (buffer_encoding === undefined) {
        buffer_encoding = "utf8";
    }
    const decoder = new decoder_1.default(base32_encoding, buffer_encoding);
    return decoder.update(data, true);
}
exports.decode = decode;
//# sourceMappingURL=legacy.js.map