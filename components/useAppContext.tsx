import React, {Dispatch, SetStateAction, useContext} from 'react';
import {useCallback} from 'react';
import {CreateBandApplicationInput} from '../types/graphql';

export type AppContextT = Partial<CreateBandApplicationInput>;

export const AppContext = React.createContext<
  [AppContextT, Dispatch<SetStateAction<AppContextT>>]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>([{}, () => {}]);

export const APP_CONTEXT_LOCAL_STORAGE_KEY = 'appContext';

export function useAppContext(): [
  AppContextT,
  (newValues: AppContextT) => void,
  () => void,
] {
  const [context, setContext] = useContext(AppContext);

  const updateContext = useCallback(
    (newValues: AppContextT) => {
      const newContext = {...context, ...newValues};
      setContext(newContext);
      window.localStorage.setItem(
        APP_CONTEXT_LOCAL_STORAGE_KEY,
        JSON.stringify(newContext),
      );
    },
    [context, setContext],
  );

  const resetContext = useCallback(() => {
    setContext({});
    window.localStorage.removeItem(APP_CONTEXT_LOCAL_STORAGE_KEY);
  }, [setContext]);
  return [context, updateContext, resetContext];
}
