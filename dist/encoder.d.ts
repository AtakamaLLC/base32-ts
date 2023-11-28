/// <reference types="node" />
import AlphaCodec from "./alphacodec";
export default class Encoder {
    #private;
    readonly base32_encoding: AlphaCodec;
    private output;
    constructor(base32_encoding?: AlphaCodec);
    update(input: string | Buffer, flush?: boolean): string;
    finish(check?: boolean): string;
    private readByte;
}
