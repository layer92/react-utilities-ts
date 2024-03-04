import { useEffect, useState } from "react";

type Callback = ()=>void|Promise<void>;
type ResultCallback<ResultType> = ()=>ResultType|Promise<ResultType>
type Dependencies = React.DependencyList;

export function UseAsyncEffect(callback:Callback,dependiencies?:Dependencies){
    useEffect(
        ()=>{
            callback();
        },
        dependiencies
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

export function UseLocalStorageValue<ValueType>(localStorageKey:string,initialValue:ValueType){
    function makeInitialValue(){
        const jsonString = localStorage.getItem(localStorageKey);
        if(!jsonString){
            return initialValue;
        }
        return JSON.parse(jsonString) as ValueType;
    }
    const [value,setValueInReact] = useState<ValueType>(makeInitialValue());
    function setValue(value:ValueType){
        localStorage.setItem(localStorageKey,JSON.stringify(value));
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
        if(!tracker.unmounted){
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
