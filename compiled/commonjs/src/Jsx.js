"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinEnglishTermsJsx = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * Lets you join terms in a grammatically-correct way. Defaults to JoinEnglishTermsJsx(["a","b","c"]) = <>a, b, and c</>
 *
 * https://en.wikipedia.org/wiki/Serial_comma
 * @param array
 * @param baseSeparator Defaults to ", "
 * @param baseSeparator Defaults to " and " Used when there are exactly two items.
 * @param finalSeparator Defaults ", and "
 */
function JoinEnglishTermsJsx(array, baseSeparator, twoSeparator, finalSeparator) {
    const length = array.length;
    if (length === 0) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
    else if (length === 1) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: array[0] });
    }
    else if (length === 2) {
        twoSeparator = twoSeparator ?? " and ";
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [array[0], twoSeparator, array[1]] });
    }
    baseSeparator = baseSeparator ?? ", ";
    finalSeparator = finalSeparator ?? ", and ";
    const result = [];
    for (let i = 0; i < length; ++i) {
        result.push(array[i]);
        if (i === length - 2) {
            result.push((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: finalSeparator }, i + "f"));
        }
        else {
            result.push((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: baseSeparator }, i + "b"));
        }
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: result });
}
exports.JoinEnglishTermsJsx = JoinEnglishTermsJsx;
