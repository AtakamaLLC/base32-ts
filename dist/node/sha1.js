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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Base32Hash_hash;
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("node:crypto"));
const fs = __importStar(require("node:fs"));
const legacy_1 = require("../legacy");
class Base32Hash {
    constructor(hash, encoding) {
        _Base32Hash_hash.set(this, void 0);
        __classPrivateFieldSet(this, _Base32Hash_hash, hash, "f");
        this.encoding = encoding;
    }
    update(input) {
        __classPrivateFieldGet(this, _Base32Hash_hash, "f").update(input);
        return this;
    }
    async consume(generator) {
        for await (const chunk of generator) {
            __classPrivateFieldGet(this, _Base32Hash_hash, "f").update(chunk);
        }
        return this;
    }
    digest() {
        return (0, legacy_1.encode)(__classPrivateFieldGet(this, _Base32Hash_hash, "f").digest(), this.encoding);
    }
    static create(algorithm, encoding = legacy_1.Encoding.base32_js, options) {
        return new Base32Hash(crypto.createHash(algorithm, options), encoding);
    }
    async hash(input) {
        if (typeof input === "string" || Buffer.isBuffer(input)) {
            this.update(input);
        }
        else if (typeof input[Symbol.asyncIterator] === "function") {
            await this.consume(input);
        }
        else {
            throw new Error("Invalid input: " + input);
        }
        return this.digest();
    }
}
_Base32Hash_hash = new WeakMap();
function legacy_sha1(input, cb) {
    const hash = new Base32Hash(crypto.createHash("sha1"), legacy_1.Encoding.base32_js);
    if (input !== undefined) {
        if (cb !== undefined) {
            hash.hash(input).then((result) => cb(null, result), (err) => cb(err, null));
            return;
        }
        else {
            if (typeof input === "string" || Buffer.isBuffer(input)) {
                return hash.update(input).digest();
            }
            else {
                throw new Error("Invalid input for synchronous call: " + input);
            }
        }
    }
    // return hash
    return hash;
}
legacy_sha1.file = async function (filename, cb) {
    if (filename === "-") {
        process.stdin.resume();
        return legacy_sha1(process.stdin, cb);
    }
    fs.stat(filename, (err, stats) => {
        if (err)
            return cb(err, null);
        if (stats.isDirectory())
            return cb({ dir: true, message: "Is a directory" }, null);
        return legacy_sha1(fs.createReadStream(filename), cb);
    });
};
exports.default = legacy_sha1;
//# sourceMappingURL=sha1.js.map