"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateVariable = exports.useVariable = void 0;
const react_1 = require("react");
const useVariable = (variable) => {
    const stateRef = react_1.useRef(variable);
    stateRef.current = variable;
    return stateRef;
};
exports.useVariable = useVariable;
const useStateVariable = (variable) => {
    const [state, setState] = react_1.useState(variable);
    const stateRef = react_1.useRef(state);
    stateRef.current = state;
    return [state, stateRef, setState];
};
exports.useStateVariable = useStateVariable;
