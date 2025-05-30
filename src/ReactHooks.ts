import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type Callback = ()=>void|Promise<void>;
type ResultCallback<ResultType> = ()=>ResultType|Promise<ResultType>
type Dependencies = React.DependencyList;

export function UseAsyncEffect(callback:Callback,dependencies?:Dependencies){
    useEffect(
        ()=>{
            callback();
        },
        dependencies
    );
}

/**
 * The returned value will be undefined until the callback completes (after which it will be the result of the callback).
 */
export function UseResult<ResultType>(callback:ResultCallback<ResultType>,dependencies?:Dependencies){
    const [value,setValue] = useState<ResultType>();
    async function getResultSetValue(){
        const result = await callback();
        setValue(result);
    }
    UseAsyncEffect(getResultSetValue,dependencies);
    return value;
}

export function UseResultOnMount<ResultType>(callback:ResultCallback<ResultType>){
    return UseResult(callback,[]);
}

/** Saves the provided value to localstorage. Handles JSON serialization/deserialization for you. */
export function UseLocalStorageValue<ValueType>(localStorageKey:string,initialValue:ValueType){
    function loadOrSetInitialValue_getInitialValue(){
        const jsonString = localStorage.getItem(localStorageKey);
        if(jsonString===null){
            if(initialValue!==undefined&&initialValue!==null){
                localStorage.setItem(localStorageKey,JSON.stringify(initialValue));
            }
            return initialValue;
        }
        return JSON.parse(jsonString) as ValueType;
    }
    const [value,setValueInReact] = useState<ValueType>(loadOrSetInitialValue_getInitialValue());
    function setValue(value:ValueType){
        if(value===undefined||value===null){
            localStorage.removeItem(localStorageKey);
        }else{
            localStorage.setItem(localStorageKey,JSON.stringify(value));
        }
        setValueInReact(value);
    }
    return [value,setValue] as const;
}

export function UseComponentDidMount(callback:Callback){
    UseAsyncEffect(callback,[]);
}

export function UseDelayedComponentDidMount(callback:Callback,delayMs:number){
    function callbackWithDelay(){
        setTimeout(callback,delayMs);
    }
    UseAsyncEffect(callbackWithDelay,[]);
}

export function UseDelayedEffect(callback:Callback,dependencies:Dependencies,delayMs:number){
    function callbackWithDelay(){
        setTimeout(callback,delayMs);
    }
    UseAsyncEffect(callbackWithDelay,dependencies);
}


export function UseComponentDidUpdate(callback:Callback){
    UseAsyncEffect(callback);
}

export function UseComponentWillUnmount(callback:Callback){
    useEffect(()=>{
        return ()=>{
            callback();
        };
    },[]);
}

export function UseLoopWhileMounted(callback:Callback,intervalMs:number){
    const tracker = {unmounted:false};
    async function loopAsync(){
        // console.log(tracker);
        if(tracker.unmounted){
            return;
        }
        await callback();
        setTimeout(
            loopAsync,
            intervalMs
        );
    }
    UseComponentDidMount( loopAsync );
    UseComponentWillUnmount( ()=>{
        tracker.unmounted = true;
    } );
}


export function UseQueryParameter(parameterKey:string):string|undefined{
    const [searchParams] = useSearchParams();
    let value:string|null|undefined = searchParams.get(parameterKey);
    if(value===null){
        value = undefined;
    }
    return value;
}

export function UseUrlParameter(parameterKey:string):string|undefined{
    const params = useParams();
    let value = params[parameterKey as keyof typeof params];
    if(value===null){
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
export function UseDebouncedValue<Value>(value:Value,options?:{delayMs?:number}){
    const delayMs = options?.delayMs ?? 500;
    const [debouncedValue,setDebouncedValue] = useState(value);
    useEffect(()=>{
        const timeout = setTimeout(()=>setDebouncedValue(value), delayMs);
        return ()=>clearTimeout(timeout);
    },[value]);
    return debouncedValue;
}

/**
 * NOTE: Untested
 * Creates a function that, when called, calls the callback with debouncing.
 * @param callback The function to call. If called multiple times within a short internal, only the last call will take place.
 * @param options.delayMs The amount of time that the raw value must go unchanged before the decouncedValue is changed. Default is 500ms.
 * @returns The debouncedValue that will change slowly.
 */
export function UseDebouncedCallback<Callback extends (...parameters:any[])=>void>(callback:Callback,options?:{delayMs?:number}):Callback{
    const delayMs = options?.delayMs ?? 500;
    let timeouts:number[] = [];
    const debouncedCallback = (...parameters:any[])=>{
        timeouts.splice(0);
        const timeout = setTimeout(()=>callback.call(undefined,...parameters), delayMs);
        timeouts.push(timeout);
    }
    return debouncedCallback as Callback;
}