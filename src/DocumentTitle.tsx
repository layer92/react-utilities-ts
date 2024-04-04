import { useEffect } from "react"

export function DocumentTitle({
    children
}:{
    children?:any
}){
    useEffect(()=>{
        document.title = ''+children;
    },[]);
    return <></>;
}