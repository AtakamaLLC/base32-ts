/// <reference types="node" />
import Encoder from "./encoder";
import AlphaCodec from "./alphacodec";
import Decoder from "./decoder";
declare class Base32 {
    readonly encoding: AlphaCodec;
    constructor(encoding?: AlphaCodec);
    makeEncoder(): Encoder;
    makeDecoder(): Decoder<null>;
    makeDecoder<T extends BufferEncoding | null>(buffer_encoding: T): Decoder<T>;
    encode(data: string | Buffer): string;
    decode(data: string): string;
    decode(data: string, buffer_encoding: null): Buffer;
    decode(data: string, buffer_encoding: BufferEncoding): string;
}
export default Base32;
