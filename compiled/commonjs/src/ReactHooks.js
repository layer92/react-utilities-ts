"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseDebouncedCallback = exports.UseDebouncedValue = exports.UseUrlParameter = exports.UseQueryParameter = exports.UseLoopWhileMounted = exports.UseComponentWillUnmount = exports.UseComponentDidUpdate = exports.UseEffectWhileTruthy = exports.UseEffectWhileDefined = exports.UseEffectOnceWhenTruthy = exports.UseEffectOnceWhenDefined = exports.UseDelayedEffect = exports.UseDelayedComponentDidMount = exports.UseComponentDidMount = exports.UseSessionStorageValue = exports.UseLocalStorageValue = exports.UseResultOnMount = exports.UseResult = exports.UseAsyncEffect = void 0;
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
/** Saves the provided value to localstorage. Handles JSON serialization/deserialization for you. */
function UseLocalStorageValue(localStorageKey, initialValue) {
    function loadOrSetInitialValue_getInitialValue() {
        const jsonString = localStorage.getItem(localStorageKey);
        if (jsonString === null) {
            if (initialValue !== undefined && initialValue !== null) {
                localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
            }
            return initialValue;
        }
        return JSON.parse(jsonString);
    }
    const [value, setValueInReact] = (0, react_1.useState)(loadOrSetInitialValue_getInitialValue());
    function setValue(value) {
        if (value === undefined || value === null) {
            localStorage.removeItem(localStorageKey);
        }
        else {
            localStorage.setItem(localStorageKey, JSON.stringify(value));
        }
        setValueInReact(value);
    }
    return [value, setValue];
}
exports.UseLocalStorageValue = UseLocalStorageValue;
/** Saves the provided value to sessionstorage. Handles JSON serialization/deserialization for you. */
function UseSessionStorageValue(sessionStorageKey, initialValue) {
    function loadOrSetInitialValue_getInitialValue() {
        const jsonString = sessionStorage.getItem(sessionStorageKey);
        if (jsonString === null) {
            if (initialValue !== undefined && initialValue !== null) {
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(initialValue));
            }
            return initialValue;
        }
        return JSON.parse(jsonString);
    }
    const [value, setValueInReact] = (0, react_1.useState)(loadOrSetInitialValue_getInitialValue());
    function setValue(value) {
        if (value === undefined || value === null) {
            sessionStorage.removeItem(sessionStorageKey);
        }
        else {
            sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
        }
        setValueInReact(value);
    }
    return [value, setValue];
}
exports.UseSessionStorageValue = UseSessionStorageValue;
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
/** When all of the dependencies become defined, the callback will be called once. */
function UseEffectOnceWhenDefined(callback, dependencies) {
    const [isCalled, setIsCalled] = (0, react_1.useState)(false);
    UseAsyncEffect(async () => {
        if (isCalled) {
            return;
        }
        if (dependencies.some(a => a === undefined)) {
            return;
        }
        setIsCalled(true);
        await callback();
    }, [dependencies]);
}
exports.UseEffectOnceWhenDefined = UseEffectOnceWhenDefined;
/** When all of the dependencies become truthy, the callback will be called once. */
function UseEffectOnceWhenTruthy(callback, dependencies) {
    const [isCalled, setIsCalled] = (0, react_1.useState)(false);
    UseAsyncEffect(async () => {
        if (isCalled) {
            return;
        }
        if (dependencies.some(a => !a)) {
            return;
        }
        setIsCalled(true);
        await callback();
    }, [dependencies]);
}
exports.UseEffectOnceWhenTruthy = UseEffectOnceWhenTruthy;
/** Just like UseAsyncEffect, except the callback will only be enabled while all the dependencies are defined. */
function UseEffectWhileDefined(callback, dependencies) {
    UseAsyncEffect(async () => {
        if (dependencies.some(a => a === undefined)) {
            return;
        }
        await callback();
    }, [dependencies]);
}
exports.UseEffectWhileDefined = UseEffectWhileDefined;
/** Just like UseAsyncEffect, except the callback will only be enabled while all the dependencies are truthy. */
function UseEffectWhileTruthy(callback, dependencies) {
    UseAsyncEffect(async () => {
        if (dependencies.some(a => !a)) {
            return;
        }
        await callback();
    }, [dependencies]);
}
exports.UseEffectWhileTruthy = UseEffectWhileTruthy;
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
/**
 * Debounces a value.
 * @param value The raw value that may change frequently.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
function UseDebouncedValue(value, options) {
    const delayMs = options?.delayMs ?? 500;
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timeout);
    }, [value]);
    return debouncedValue;
}
exports.UseDebouncedValue = UseDebouncedValue;
/**
 * NOTE: Untested
 * Creates a function that, when called, calls the callback with debouncing.
 * @param callback The function to call. If called multiple times within a short internal, only the last call will take place.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
function UseDebouncedCallback(callback, options) {
    const delayMs = options?.delayMs ?? 500;
    let timeouts = [];
    const debouncedCallback = (...parameters) => {
        timeouts.splice(0);
        const timeout = setTimeout(() => callback.call(undefined, ...parameters), delayMs);
        timeouts.push(timeout);
    };
    return debouncedCallback;
}
exports.UseDebouncedCallback = UseDebouncedCallback;
