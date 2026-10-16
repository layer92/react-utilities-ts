/// <reference types="react" />
type ElementLike = string | JSX.Element | JSX.Element[] | undefined;
/**
 * Lets you join terms in a grammatically-correct way. Defaults to JoinEnglishTermsJsx(["a","b","c"]) = <>a, b, and c</>
 *
 * https://en.wikipedia.org/wiki/Serial_comma
 * @param array
 * @param baseSeparator Defaults to ", "
 * @param baseSeparator Defaults to " and " Used when there are exactly two items.
 * @param finalSeparator Defaults ", and "
 */
export declare function JoinEnglishTermsJsx(array: ElementLike[], baseSeparator?: ElementLike, twoSeparator?: ElementLike, finalSeparator?: ElementLike): JSX.Element;
export {};
