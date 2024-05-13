"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseUrlParameter = exports.UseQueryParameter = exports.UseLoopWhileMounted = exports.UseComponentWillUnmount = exports.UseComponentDidUpdate = exports.UseDelayedEffect = exports.UseDelayedComponentDidMount = exports.UseComponentDidMount = exports.UseLocalStorageValue = exports.UseResultOnMount = exports.UseResult = exports.UseAsyncEffect = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function UseAsyncEffect(callback, dependencies) {
    (0, react_1.useEffect)(() => {
        callback();
    }, dependencies);
}
exports.UseAsyncEffect = UseAsyncEffect;
/**
 * The returned value will be undefined until the callback completes (after which it will be the result of the callback).
 */
function UseResult(callback, dependencies) {
    const [value, setValue] = (0, react_1.useState)();
    async function getResultSetValue() {
        const result = await callback();
        setValue(result);
    }
    UseAsyncEffect(getResultSetValue, dependencies);
    return value;
}
exports.UseResult = UseResult;
function UseResultOnMount(callback) {
    return UseResult(callback, []);
}
exports.UseResultOnMount = UseResultOnMount;
function UseLocalStorageValue(localStorageKey, initialValue) {
    function makeInitialValue() {
        const jsonString = localStorage.getItem(localStorageKey);
        if (!jsonString) {
            return initialValue;
        }
        return JSON.parse(jsonString);
    }
    const [value, setValueInReact] = (0, react_1.useState)(makeInitialValue());
    function setValue(value) {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
        setValueInReact(value);
    }
    return [value, setValue];
}
exports.UseLocalStorageValue = UseLocalStorageValue;
function UseComponentDidMount(callback) {
    UseAsyncEffect(callback, []);
}
exports.UseComponentDidMount = UseComponentDidMount;
function UseDelayedComponentDidMount(callback, delayMs) {
    function callbackWithDelay() {
        setTimeout(callback, delayMs);
    }
    UseAsyncEffect(callbackWithDelay, []);
}
exports.UseDelayedComponentDidMount = UseDelayedComponentDidMount;
function UseDelayedEffect(callback, dependencies, delayMs) {
    function callbackWithDelay() {
        setTimeout(callback, delayMs);
    }
    UseAsyncEffect(callbackWithDelay, dependencies);
}
exports.UseDelayedEffect = UseDelayedEffect;
function UseComponentDidUpdate(callback) {
    UseAsyncEffect(callback);
}
exports.UseComponentDidUpdate = UseComponentDidUpdate;
function UseComponentWillUnmount(callback) {
    (0, react_1.useEffect)(() => {
        return () => {
            callback();
        };
    }, []);
}
exports.UseComponentWillUnmount = UseComponentWillUnmount;
function UseLoopWhileMounted(callback, intervalMs) {
    const tracker = { unmounted: false };
    async function loopAsync() {
        // console.log(tracker);
        if (tracker.unmounted) {
            return;
        }
        await callback();
        setTimeout(loopAsync, intervalMs);
    }
    UseComponentDidMount(loopAsync);
    UseComponentWillUnmount(() => {
        tracker.unmounted = true;
    });
}
exports.UseLoopWhileMounted = UseLoopWhileMounted;
function UseQueryParameter(parameterKey) {
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    let value = searchParams.get(parameterKey);
    if (value === null) {
        value = undefined;
    }
    return value;
}
exports.UseQueryParameter = UseQueryParameter;
function UseUrlParameter(parameterKey) {
    const params = (0, react_router_dom_1.useParams)();
    let value = params[parameterKey];
    if (value === null) {
        value = undefined;
    }
    return value;
}
exports.UseUrlParameter = UseUrlParameter;
