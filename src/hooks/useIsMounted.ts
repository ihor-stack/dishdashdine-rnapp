import {useEffect, useRef} from 'react';

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(
    () => () => {
      isMounted.current = false;
      return () => (isMounted.current = false);
    },
    [],
  );

  return isMounted;
};
