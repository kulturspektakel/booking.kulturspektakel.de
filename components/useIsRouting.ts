import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

type IsRouting = 'same-page' | 'other-page' | 'none';
export default function useIsRouting(): IsRouting {
  const {events, route} = useRouter();
  const [isRouting, setIsRouting] = useState<IsRouting>('none');
  useEffect(() => {
    const onRouteChangeStart = (url: string) => {
      const routePath = route.split('/');
      const urlPath = url.split('/');
      for (let i = 0; i < urlPath.length; i++) {
        if (routePath?.at(i)?.startsWith('[...')) {
          // match all
          break;
        } else if (routePath.at(i)?.startsWith('[')) {
          // skip
          continue;
        } else if (urlPath[i] != routePath[i]) {
          setIsRouting('other-page');
          return;
        }
      }

      setIsRouting('same-page');
    };
    const onRouteChangeComplete = () => {
      setIsRouting('none');
    };

    events.on('routeChangeStart', onRouteChangeStart);
    events.on('routeChangeComplete', onRouteChangeComplete);

    () => {
      events.off('routeChangeStart', onRouteChangeStart);
      events.off('routeChangeStart', onRouteChangeComplete);
    };
  }, [events, route]);

  return isRouting;
}
