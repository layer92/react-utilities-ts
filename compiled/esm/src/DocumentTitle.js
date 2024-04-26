import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
export function DocumentTitle({ children }) {
    useEffect(() => {
        document.title = '' + children;
    }, [children]);
    return _jsx(_Fragment, {});
}
