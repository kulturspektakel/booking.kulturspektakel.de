import React, {Dispatch, SetStateAction, useContext} from 'react';
import {useCallback} from 'react';
import {CreateBandApplicationInput} from '../types/graphql';

export type AppContextT = Partial<CreateBandApplicationInput>;

export const AppContext = React.createContext<
  [AppContextT, Dispatch<SetStateAction<AppContextT>>]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>([{}, () => {}]);

const unloadCallback = (event: Event) => {
  event.preventDefault();
  const warning = 'Die Bewerbung ist noch nicht abgesendet.';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  event.returnValue = warning;
  return warning;
};

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
      window.addEventListener('beforeunload', unloadCallback);
    },
    [context, setContext],
  );

  const resetContext = useCallback(() => {
    setContext({});
    window.removeEventListener('beforeunload', unloadCallback);
  }, [setContext]);
  return [context, updateContext, resetContext];
}
