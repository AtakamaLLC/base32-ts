/// <reference types="node" />
import Encoder from "./encoder";
import AlphaCodec from "./alphacodec";
import * as Encoding from "./encoding";
import Decoder from "./decoder";
import legacy_sha1 from "./node/sha1";
export declare function encode(data: string | Buffer, base32_encoding?: AlphaCodec): string;
export declare function decode(data: string, base32_encoding?: AlphaCodec): string;
export declare function decode(data: string, base32_encoding: AlphaCodec, buffer_encoding: null): Buffer;
export declare function decode(data: string, base32_encoding: AlphaCodec, buffer_encoding: BufferEncoding): string;
export { Encoder, Decoder, AlphaCodec, Encoding, legacy_sha1 as sha1 };
