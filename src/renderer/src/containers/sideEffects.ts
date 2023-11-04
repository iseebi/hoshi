import { EffectCallback, useEffect, useRef } from 'react';

export const useOnMount = (effectCallback: EffectCallback): void => useEffect(effectCallback, []);

export const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
