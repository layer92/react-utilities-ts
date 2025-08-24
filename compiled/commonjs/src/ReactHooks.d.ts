/// <reference types="react" />
type Callback = () => void | Promise<void>;
type ResultCallback<ResultType> = () => ResultType | Promise<ResultType>;
type Dependencies = React.DependencyList;
export declare function UseAsyncEffect(callback: Callback, dependencies?: Dependencies): void;
/**
 * The returned value will be undefined until the callback completes (after which it will be the result of the callback).
 */
export declare function UseResult<ResultType>(callback: ResultCallback<ResultType>, dependencies?: Dependencies): ResultType | undefined;
export declare function UseResultOnMount<ResultType>(callback: ResultCallback<ResultType>): ResultType | undefined;
/** Saves the provided value to localstorage. Handles JSON serialization/deserialization for you. */
export declare function UseLocalStorageValue<ValueType>(localStorageKey: string, initialValue: ValueType): readonly [ValueType, (value: ValueType) => void];
/** Saves the provided value to sessionstorage. Handles JSON serialization/deserialization for you. */
export declare function UseSessionStorageValue<ValueType>(sessionStorageKey: string, initialValue: ValueType): readonly [ValueType, (value: ValueType) => void];
export declare function UseComponentDidMount(callback: Callback): void;
export declare function UseDelayedComponentDidMount(callback: Callback, delayMs: number): void;
export declare function UseDelayedEffect(callback: Callback, dependencies: Dependencies, delayMs: number): void;
export declare function UseComponentDidUpdate(callback: Callback): void;
export declare function UseComponentWillUnmount(callback: Callback): void;
export declare function UseLoopWhileMounted(callback: Callback, intervalMs: number): void;
export declare function UseQueryParameter(parameterKey: string): string | undefined;
export declare function UseUrlParameter(parameterKey: string): string | undefined;
/**
 * Debounces a value.
 * @param value The raw value that may change frequently.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
export declare function UseDebouncedValue<Value>(value: Value, options?: {
    delayMs?: number;
}): Value;
/**
 * NOTE: Untested
 * Creates a function that, when called, calls the callback with debouncing.
 * @param callback The function to call. If called multiple times within a short internal, only the last call will take place.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
export declare function UseDebouncedCallback<Callback extends (...parameters: any[]) => void>(callback: Callback, options?: {
    delayMs?: number;
}): Callback;
export {};
