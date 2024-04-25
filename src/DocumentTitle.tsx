import { useEffect } from "react"
import { UseComponentDidMount } from "./ReactHooks";

export function DocumentTitle({
    children
}:{
    children?:any
}){
    useEffect(()=>{
        document.title = ''+children;
        console.log(document.title);
    },[children]);
    return <></>;
}