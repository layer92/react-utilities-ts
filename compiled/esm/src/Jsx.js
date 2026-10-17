import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
/**
 * Lets you join terms in an English grammatically-correct way. Defaults to JoinTermsJsx(["a","b","c"]) = <>a, b, and c</>
 *
 * https://en.wikipedia.org/wiki/Serial_comma
 * @param array
 * @param baseSeparator Defaults to ", "
 * @param baseSeparator Defaults to " and " Used when there are exactly two items.
 * @param finalSeparator Defaults ", and "
 */
export function JoinTermsJsx(array, baseSeparator, twoSeparator, finalSeparator) {
    const length = array.length;
    if (length === 0) {
        return _jsx(_Fragment, {});
    }
    else if (length === 1) {
        return _jsx(_Fragment, { children: array[0] });
    }
    else if (length === 2) {
        twoSeparator = twoSeparator ?? " and ";
        return _jsxs(_Fragment, { children: [array[0], twoSeparator, array[1]] });
    }
    baseSeparator = baseSeparator ?? ", ";
    finalSeparator = finalSeparator ?? ", and ";
    const result = [];
    for (let i = 0; i < length; ++i) {
        result.push(array[i]);
        if (i === length - 2) {
            result.push(_jsx(Fragment, { children: finalSeparator }, i + "f"));
        }
        else if (i !== length - 1) {
            result.push(_jsx(Fragment, { children: baseSeparator }, i + "b"));
        }
    }
    return _jsx(_Fragment, { children: result });
}
