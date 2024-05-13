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
export declare function UseLocalStorageValue<ValueType>(localStorageKey: string, initialValue: ValueType): readonly [ValueType, (value: ValueType) => void];
export declare function UseComponentDidMount(callback: Callback): void;
export declare function UseDelayedComponentDidMount(callback: Callback, delayMs: number): void;
export declare function UseDelayedEffect(callback: Callback, dependencies: Dependencies, delayMs: number): void;
export declare function UseComponentDidUpdate(callback: Callback): void;
export declare function UseComponentWillUnmount(callback: Callback): void;
export declare function UseLoopWhileMounted(callback: Callback, intervalMs: number): void;
export declare function UseQueryParameter(parameterKey: string): string | undefined;
export declare function UseUrlParameter(parameterKey: string): string | undefined;
export {};
