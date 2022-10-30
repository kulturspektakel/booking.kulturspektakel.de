import {useRouter} from 'next/router';

export default function useIsDJ() {
  const {query} = useRouter();
  return 'dj' in query;
}
