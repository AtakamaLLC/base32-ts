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
var _Decoder_skip, _Decoder_byte;
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("./encoding");
class Decoder {
    constructor(base32_encoding = encoding_1.base32_js, buffer_encoding) {
        this.base32_encoding = base32_encoding;
        _Decoder_skip.set(this, 0); // how many bits we have from the previous character
        _Decoder_byte.set(this, 0); // current byte we're producing
        this.output = Buffer.alloc(0);
        this.buffer_encoding =
            buffer_encoding === undefined ? "utf-8" : buffer_encoding;
    }
    update(input, flush) {
        for (let i = 0; i < input.length; i++) {
            this.readChar(input[i]);
        }
        let output = this.output;
        this.output = Buffer.alloc(0);
        if (flush) {
            output = Buffer.concat([output, this.finish()]);
        }
        return this._value(output);
    }
    finish() {
        return this.output;
    }
    _value(data) {
        return (this.buffer_encoding ? data.toString(this.buffer_encoding) : data);
    }
    readChar(char) {
        if (typeof char !== "string") {
            if (typeof char === "number") {
                char = String.fromCharCode(char);
            }
        }
        char = char.toLowerCase();
        let val = this.base32_encoding.characterValue(char);
        if (typeof val === "undefined") {
            throw Error(`Could not find character "${char}" in lookup table.`);
        }
        val <<= 3; // move to the high bits
        __classPrivateFieldSet(this, _Decoder_byte, __classPrivateFieldGet(this, _Decoder_byte, "f") | val >>> __classPrivateFieldGet(this, _Decoder_skip, "f"), "f");
        __classPrivateFieldSet(this, _Decoder_skip, __classPrivateFieldGet(this, _Decoder_skip, "f") + 5, "f");
        if (__classPrivateFieldGet(this, _Decoder_skip, "f") >= 8) {
            // we have enough to produce output
            this.output = Buffer.concat([
                this.output,
                Buffer.from([__classPrivateFieldGet(this, _Decoder_byte, "f")]),
            ]);
            __classPrivateFieldSet(this, _Decoder_skip, __classPrivateFieldGet(this, _Decoder_skip, "f") - 8, "f");
            if (__classPrivateFieldGet(this, _Decoder_skip, "f") > 0)
                __classPrivateFieldSet(this, _Decoder_byte, (val << (5 - __classPrivateFieldGet(this, _Decoder_skip, "f"))) & 255, "f");
            else
                __classPrivateFieldSet(this, _Decoder_byte, 0, "f");
        }
    }
}
_Decoder_skip = new WeakMap(), _Decoder_byte = new WeakMap();
exports.default = Decoder;
//# sourceMappingURL=decoder.js.map