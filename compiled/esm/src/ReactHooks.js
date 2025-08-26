import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
export function UseAsyncEffect(callback, dependencies) {
    useEffect(() => {
        callback();
    }, dependencies);
}
/**
 * The returned value will be undefined until the callback completes (after which it will be the result of the callback).
 */
export function UseResult(callback, dependencies) {
    const [value, setValue] = useState();
    async function getResultSetValue() {
        const result = await callback();
        setValue(result);
    }
    UseAsyncEffect(getResultSetValue, dependencies);
    return value;
}
export function UseResultOnMount(callback) {
    return UseResult(callback, []);
}
/** Saves the provided value to localstorage. Handles JSON serialization/deserialization for you. */
export function UseLocalStorageValue(localStorageKey, initialValue) {
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
    const [value, setValueInReact] = useState(loadOrSetInitialValue_getInitialValue());
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
/** Saves the provided value to sessionstorage. Handles JSON serialization/deserialization for you. */
export function UseSessionStorageValue(sessionStorageKey, initialValue) {
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
    const [value, setValueInReact] = useState(loadOrSetInitialValue_getInitialValue());
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
export function UseComponentDidMount(callback) {
    UseAsyncEffect(callback, []);
}
export function UseDelayedComponentDidMount(callback, delayMs) {
    function callbackWithDelay() {
        setTimeout(callback, delayMs);
    }
    UseAsyncEffect(callbackWithDelay, []);
}
export function UseDelayedEffect(callback, dependencies, delayMs) {
    function callbackWithDelay() {
        setTimeout(callback, delayMs);
    }
    UseAsyncEffect(callbackWithDelay, dependencies);
}
/** When all of the dependencies become defined, the callback will be called once. */
export function UseEffectOnceWhenDefined(callback, dependencies) {
    const [isCalled, setIsCalled] = useState(false);
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
/** When all of the dependencies become truthy, the callback will be called once. */
export function UseEffectOnceWhenTruthy(callback, dependencies) {
    const [isCalled, setIsCalled] = useState(false);
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
/** Just like UseAsyncEffect, except the callback will only be enabled while all the dependencies are defined. */
export function UseEffectWhileDefined(callback, dependencies) {
    UseAsyncEffect(async () => {
        if (dependencies.some(a => a === undefined)) {
            return;
        }
        await callback();
    }, [dependencies]);
}
/** Just like UseAsyncEffect, except the callback will only be enabled while all the dependencies are truthy. */
export function UseEffectWhileTruthy(callback, dependencies) {
    UseAsyncEffect(async () => {
        if (dependencies.some(a => !a)) {
            return;
        }
        await callback();
    }, [dependencies]);
}
export function UseComponentDidUpdate(callback) {
    UseAsyncEffect(callback);
}
export function UseComponentWillUnmount(callback) {
    useEffect(() => {
        return () => {
            callback();
        };
    }, []);
}
export function UseLoopWhileMounted(callback, intervalMs) {
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
export function UseQueryParameter(parameterKey) {
    const [searchParams] = useSearchParams();
    let value = searchParams.get(parameterKey);
    if (value === null) {
        value = undefined;
    }
    return value;
}
export function UseUrlParameter(parameterKey) {
    const params = useParams();
    let value = params[parameterKey];
    if (value === null) {
        value = undefined;
    }
    return value;
}
/**
 * Debounces a value.
 * @param value The raw value that may change frequently.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
export function UseDebouncedValue(value, options) {
    const delayMs = options?.delayMs ?? 500;
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timeout);
    }, [value]);
    return debouncedValue;
}
/**
 * NOTE: Untested
 * Creates a function that, when called, calls the callback with debouncing.
 * @param callback The function to call. If called multiple times within a short internal, only the last call will take place.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
export function UseDebouncedCallback(callback, options) {
    const delayMs = options?.delayMs ?? 500;
    let timeouts = [];
    const debouncedCallback = (...parameters) => {
        timeouts.splice(0);
        const timeout = setTimeout(() => callback.call(undefined, ...parameters), delayMs);
        timeouts.push(timeout);
    };
    return debouncedCallback;
}
