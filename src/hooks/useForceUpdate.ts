import {useState} from 'react';

export default function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0); // integer state
  // eslint-disable-next-line no-shadow
  return () => setValue(value => ++value); // update the state to force render
}
