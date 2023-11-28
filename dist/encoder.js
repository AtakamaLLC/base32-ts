"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Encoder_skip, _Encoder_bits;
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("./encoding");
class Encoder {
    constructor(base32_encoding = encoding_1.base32_js) {
        this.base32_encoding = base32_encoding;
        _Encoder_skip.set(this, 0); // how many bits we will skip from the first byte
        _Encoder_bits.set(this, 0); // 5 high bits, carry from one byte to the next
        this.output = "";
    }
    update(input, flush) {
        if (typeof input === "string") {
            input = Buffer.from(input);
        }
        for (let i = 0; i < input.length;) {
            i += this.readByte(input[i]);
        }
        // consume all output
        let output = this.output;
        this.output = "";
        if (flush) {
            output += this.finish();
        }
        return output;
    }
    finish(check) {
        const output = this.output +
            (__classPrivateFieldGet(this, _Encoder_skip, "f") < 0
                ? this.base32_encoding.characterForValue(__classPrivateFieldGet(this, _Encoder_bits, "f") >> 3)
                : "") +
            (check ? "$" : "");
        this.output = "";
        return output;
    }
    // Read one byte of input
    // Should not really be used except by "update"
    readByte(byte) {
        // coerce the byte to an int
        if (typeof byte === "string")
            byte = byte.charCodeAt(0);
        if (__classPrivateFieldGet(this, _Encoder_skip, "f") < 0) {
            // we have a carry from the previous byte
            __classPrivateFieldSet(this, _Encoder_bits, __classPrivateFieldGet(this, _Encoder_bits, "f") | byte >> -__classPrivateFieldGet(this, _Encoder_skip, "f"), "f");
        }
        else {
            // no carry
            __classPrivateFieldSet(this, _Encoder_bits, (byte << __classPrivateFieldGet(this, _Encoder_skip, "f")) & 248, "f");
        }
        if (__classPrivateFieldGet(this, _Encoder_skip, "f") > 3) {
            // not enough data to produce a character, get us another one
            __classPrivateFieldSet(this, _Encoder_skip, __classPrivateFieldGet(this, _Encoder_skip, "f") - 8, "f");
            return 1;
        }
        if (__classPrivateFieldGet(this, _Encoder_skip, "f") < 4) {
            // produce a character
            this.output += this.base32_encoding.characterForValue(__classPrivateFieldGet(this, _Encoder_bits, "f") >> 3);
            __classPrivateFieldSet(this, _Encoder_skip, __classPrivateFieldGet(this, _Encoder_skip, "f") + 5, "f");
        }
        return 0;
    }
}
_Encoder_skip = new WeakMap(), _Encoder_bits = new WeakMap();
exports.default = Encoder;
//# sourceMappingURL=encoder.js.map