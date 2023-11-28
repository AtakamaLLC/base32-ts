/// <reference types="node" />
import AlphaCodec from "./alphacodec";
type DecoderOutput<T> = T extends null ? Buffer : string;
export default class Decoder<T extends BufferEncoding | undefined | null = undefined> {
    #private;
    readonly base32_encoding: AlphaCodec;
    private output;
    readonly buffer_encoding: T;
    constructor(base32_encoding?: AlphaCodec, buffer_encoding?: T);
    update(input: string | Buffer, flush?: boolean): DecoderOutput<T>;
    finish(): Buffer;
    private _value;
    private readChar;
}
export {};
