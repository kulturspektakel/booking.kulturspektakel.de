import React, {Dispatch, SetStateAction, useContext} from 'react';
import {useCallback} from 'react';
import {CreateBandApplicationInput} from '../types/graphql';

export type AppContextT = Partial<CreateBandApplicationInput>;

export const AppContext = React.createContext<
  [AppContextT, Dispatch<SetStateAction<AppContextT>>]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>([{}, () => {}]);

export function useAppContext(): [
  AppContextT,
  (newValues: AppContextT) => void,
] {
  const [context, setContext] = useContext(AppContext);

  const updateContext = useCallback(
    (newValues: AppContextT) => {
      const newContext = {...context, ...newValues};
      setContext(newContext);
    },
    [context, setContext],
  );
  return [context, updateContext];
}
