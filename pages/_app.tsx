import '../styles/globals.css';
import React, {useMemo} from 'react';
import {AppProps} from 'next/app';
import {
  ChakraProvider,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from '@chakra-ui/react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from '@apollo/client';
import {withScalars} from 'apollo-link-scalars';
import introspectionResult from '../types/graphql.schema.json';
import {buildClientSchema, IntrospectionQuery} from 'graphql';
import {GraphQLDateTime, GraphQLDate} from 'graphql-scalars';
import {StepsStyleConfig as Steps} from 'chakra-ui-steps';
import Head from 'next/head';
import Script from 'next/script';

const App = ({Component, pageProps}: AppProps) => {
  const client = useMemo(() => initializeApollo(), []);

  const theme = extendTheme({
    fonts: {
      heading: `"Space Grotesk", sans-serif`,
      body: `"Space Grotesk", sans-serif`,
    },
    colors: {
      brand: {
        '900': '#073332',
      },
      gray: {
        // '50': '#F3F3F1',
        '100': '#f6f5f0',
        '200': '#dbd8d3',
        '300': '#d0cabc',
        '400': '#b6b39f',
        '500': '#9c9686',
        '600': '#5a574e',
        // '700': '#524F47',
        // '800': '#37352F',
        // '900': '#1B1A18',
      },
    },
    components: {
      Button: defineStyleConfig({
        baseStyle: defineStyle({
          fontWeight: 'semibold',
        }),
        variants: {
          solid: {
            bgColor: 'white',
            boxShadow: 'sm',
          },
        },
      }),
      Steps: {
        ...Steps,
        baseStyle: (props: any) => ({
          ...Steps.baseStyle(props),
          stepIconContainer: {
            ...Steps.baseStyle(props).stepIconContainer,
            _activeStep: {
              ...(Steps.baseStyle(props).stepIconContainer as any)?._activeStep,
              bg: 'gray.200',
            },
          },
        }),
      },
    },
    styles: {
      global: {
        body: {
          backgroundColor: 'gray.100',
        },
      },
    },
  });

  const suspenseCache = useMemo(() => new SuspenseCache(), []);

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client} suspenseCache={suspenseCache}>
        <Head>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '568483009893821');
                  fbq('track', 'PageView');
                `,
            }}
          />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function initializeApollo() {
  if (apolloClient) {
    return apolloClient;
  }
  const scalarLink = withScalars({
    schema: buildClientSchema(
      introspectionResult as unknown as IntrospectionQuery,
    ),
    typesMap: {
      DateTime: GraphQLDateTime,
      Date: GraphQLDate,
    },
  });

  apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      scalarLink,
      new HttpLink({uri: 'https://api.kulturspektakel.de/graphql'}),
    ]),
  });

  return apolloClient;
}

export default App;
