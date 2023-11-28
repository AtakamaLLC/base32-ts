/// <reference types="node" />
/// <reference types="node" />
import * as crypto from "node:crypto";
import { AlphaCodec } from "../legacy";
type Callback<T> = (err: unknown | null, result: T | null) => unknown;
type Input = string | Buffer;
type InputGenerator = {
    [Symbol.asyncIterator](): AsyncIterableIterator<Input>;
};
declare class Base32Hash {
    #private;
    private encoding;
    constructor(hash: crypto.Hash, encoding: AlphaCodec);
    update(input: Input): this;
    consume(generator: InputGenerator): Promise<this>;
    digest(): string;
    static create(algorithm: string, encoding?: AlphaCodec, options?: crypto.HashOptions): Base32Hash;
    hash(input: Input | InputGenerator): Promise<string>;
}
declare function legacy_sha1(): Base32Hash;
declare function legacy_sha1(input: Input): string;
declare function legacy_sha1(input: Input | InputGenerator, cb: Callback<string>): void;
declare namespace legacy_sha1 {
    var file: (filename: string, cb: Callback<string>) => Promise<void>;
}
export default legacy_sha1;
