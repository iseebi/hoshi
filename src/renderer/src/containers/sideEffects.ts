import { EffectCallback, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export,react-hooks/exhaustive-deps
export const useOnMount = (effectCallback: EffectCallback): void => useEffect(effectCallback, []);
