import { DependencyList } from "react";
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
export declare function UseLocalStorageValue<ValueType>(localStorageKey: string, initialValue: ValueType): readonly [ValueType, (next: ValueType) => void];
/** Saves the provided value to sessionstorage. Handles JSON serialization/deserialization for you. */
export declare function UseSessionStorageValue<ValueType>(sessionStorageKey: string, initialValue: ValueType): readonly [ValueType, (next: ValueType) => void];
export declare function UseComponentDidMount(callback: Callback): void;
export declare function UseDelayedComponentDidMount(callback: Callback, delayMs: number): void;
export declare function UseDelayedEffect(callback: Callback, dependencies: Dependencies, delayMs: number): void;
/** Return FALSE from the callback if not ready yet. When the callback returns UNDEFINED, it won't be called again. */
export declare function UseEffectOnceCompletely(callback: ResultCallback<false | undefined>, dependencies: Dependencies): void;
/** When all of the dependencies become defined, the callback will be called once. */
export declare function UseEffectOnceWhenDefined(callback: Callback, dependencies: Dependencies): void;
/** When all of the dependencies become truthy, the callback will be called once. */
export declare function UseEffectOnceWhenTruthy(callback: Callback, dependencies: Dependencies): void;
/** Just like UseAsyncEffect, except the callback will only be enabled while all the dependencies are defined. */
export declare function UseEffectWhileDefined(callback: Callback, dependencies: Dependencies): void;
/** Just like UseAsyncEffect, except the callback will only be enabled while all the dependencies are truthy. */
export declare function UseEffectWhileTruthy(callback: Callback, dependencies: Dependencies): void;
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
/**
 * State, but whenever the dependencies change, it resets to the sourceValue. If no dependencies array is provided, the dependency array will default to [sourceValue]
 *
 * You can use this to keep a local copy of data that you want to edit.
 * */
export declare function UseDependentState<Type>(sourceValue: Type | undefined, dependencies?: DependencyList): readonly [Type | undefined, import("react").Dispatch<import("react").SetStateAction<Type | undefined>>];
/**
 * Similar to useState, except that the initial state isn't set until the initial value becomes defined for the first time. ("the first time" = the first render in which intialValue is defined)
 *
 * This is useful for when the initialValue is fed in from a value that's fetched asynchronously.
 * */
export declare function UseLateState<Type>(initialValue: Type | undefined): readonly [Type | undefined, (value: Type | undefined) => void];
export {};
