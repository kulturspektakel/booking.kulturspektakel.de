import {useRouter} from 'next/router';
import {GenreCategory} from '../types/graphql';
import {useAppContext} from './useAppContext';

export default function useIsDJ() {
  const [context] = useAppContext();
  const {query} = useRouter();
  console.log(query);
  return context.genreCategory === GenreCategory.Dj;
}
