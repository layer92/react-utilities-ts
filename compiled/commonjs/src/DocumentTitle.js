"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function DocumentTitle({ children }) {
    (0, react_1.useEffect)(() => {
        document.title = '' + children;
        console.log(document.title);
    }, [children]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
}
exports.DocumentTitle = DocumentTitle;
