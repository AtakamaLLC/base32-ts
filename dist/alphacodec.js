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
var _AlphaCodec_characterValue, _AlphaCodec_alphabet, _AlphaCodec_case_insensitive;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines an encoding of bytes to chars and back that uses an "alphabet",
 * mapping each valid character of the encoding to a single binary sub-byte
 * value.
 *
 * Uniquely defined by:
 * - alphabet: the primary alphabet, a string of characters in order. The length
 *   must be a power of 2
 * - alias: additional characters that can be read as aliases for another
 *   character in the alphabet - for example, in a case-insensitive encoding,
 *   'a' could be an alias for 'A'.
 *
 * Two encodings with the same alphabet and aliases are identical.
 */
class AlphaCodec {
    normalize(str) {
        if (__classPrivateFieldGet(this, _AlphaCodec_case_insensitive, "f")) {
            return str.toLowerCase();
        }
        return str;
    }
    constructor(alphabet, aliases = {}) {
        _AlphaCodec_characterValue.set(this, {});
        _AlphaCodec_alphabet.set(this, void 0);
        _AlphaCodec_case_insensitive.set(this, true);
        __classPrivateFieldSet(this, _AlphaCodec_alphabet, alphabet, "f");
        for (let i = 0; i < __classPrivateFieldGet(this, _AlphaCodec_alphabet, "f").length; i++) {
            __classPrivateFieldGet(this, _AlphaCodec_characterValue, "f")[this.normalize(alphabet[i])] = i;
        }
        for (const char in aliases) {
            __classPrivateFieldGet(this, _AlphaCodec_characterValue, "f")[char] = this.characterValue(aliases[char]);
        }
    }
    characterValue(char) {
        return __classPrivateFieldGet(this, _AlphaCodec_characterValue, "f")[this.normalize(char)];
    }
    characterForValue(value) {
        return __classPrivateFieldGet(this, _AlphaCodec_alphabet, "f")[value];
    }
}
_AlphaCodec_characterValue = new WeakMap(), _AlphaCodec_alphabet = new WeakMap(), _AlphaCodec_case_insensitive = new WeakMap();
exports.default = AlphaCodec;
//# sourceMappingURL=alphacodec.js.map