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
    function makeInitialValue() {
        const jsonString = localStorage.getItem(localStorageKey);
        if (jsonString === null) {
            return initialValue;
        }
        return JSON.parse(jsonString);
    }
    const [value, setValueInReact] = useState(makeInitialValue());
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
