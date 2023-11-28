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
export default class AlphaCodec {
    #private;
    normalize(str: string): string;
    constructor(alphabet: string, aliases?: Record<string, string>);
    characterValue(char: string): number;
    characterForValue(value: number): string;
}
