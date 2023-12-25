# react-use-variable custom hook

React hook to update variable refs automatically

## Install

```bash
npm install react-use-variable
```

## Usage

```javascript
export const Component: FunctionComponent<Props> = ({ something }) => {
  const ref = useVariable(something);

  // is the same as:

  const ref = useRef(something);
  ref.current = something;

  const [state, ref, setState] = useStateVariable(something);

  // is the same as:

  const [state, setState] = useState(something);
  const ref = useRef(state);
  ref.current = something;
};
```

## License

MIT
