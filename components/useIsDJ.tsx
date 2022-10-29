import {GenreCategory} from '../types/graphql';
import {useAppContext} from './useAppContext';

export default function useIsDJ() {
  const [context] = useAppContext();
  return context.genreCategory === GenreCategory.Dj;
}
