import { useEffect, useState, useRef, MutableRefObject, SetStateAction, Dispatch } from 'react';


export const useVariable = <TYPE>(variable: TYPE): MutableRefObject<TYPE> => {

    const stateRef = useRef(variable);
    stateRef.current = variable;

    return stateRef;
}

export const useStateVariable = <TYPE>(variable: TYPE): [TYPE, MutableRefObject<TYPE>, Dispatch<SetStateAction<TYPE>>] => {

    const [state, setState] = useState(variable);

    const stateRef = useRef(state);
    stateRef.current = state;

    return [state, stateRef, setState];
}
