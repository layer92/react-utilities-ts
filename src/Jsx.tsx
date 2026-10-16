import { ElementType, Fragment } from "react";

type ElementLike = string|JSX.Element|JSX.Element[]|undefined;

/**
 * Lets you join terms in a grammatically-correct way. Defaults to JoinEnglishTermsJsx(["a","b","c"]) = <>a, b, and c</>
 *
 * https://en.wikipedia.org/wiki/Serial_comma
 * @param array 
 * @param baseSeparator Defaults to ", "
 * @param baseSeparator Defaults to " and " Used when there are exactly two items. 
 * @param finalSeparator Defaults ", and "
 */
export function JoinEnglishTermsJsx(array:ElementLike[],baseSeparator?:ElementLike,twoSeparator?:ElementLike,finalSeparator?:ElementLike):JSX.Element{
    const length = array.length;
    if(length===0){
        return <></>;
    }else if(length===1){
        return <>{array[0]}</>;
    }else if(length===2){
        twoSeparator = twoSeparator ?? " and ";
        return <>{array[0]}{twoSeparator}{array[1]}</>;
    }
    baseSeparator = baseSeparator ?? ", ";
    finalSeparator = finalSeparator ?? ", and ";
    const result:ElementLike[] = [];
    for(let i=0;i<length;++i){
        result.push(array[i]);
        if(i===length-1){
            result.push(<Fragment key={i+"f"}>{finalSeparator}</Fragment>);
        }else{
            result.push(<Fragment key={i+"b"}>{baseSeparator}</Fragment>);
        }
    }
    return <>{result}</>;
}