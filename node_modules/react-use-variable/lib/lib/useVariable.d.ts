import { MutableRefObject, SetStateAction, Dispatch } from 'react';
export declare const useVariable: <TYPE>(variable: TYPE) => MutableRefObject<TYPE>;
export declare const useStateVariable: <TYPE>(variable: TYPE) => [TYPE, MutableRefObject<TYPE>, Dispatch<SetStateAction<TYPE>>];
