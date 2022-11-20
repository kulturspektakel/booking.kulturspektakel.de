import '../styles/globals.css';
import React, {useMemo, useState} from 'react';
import {AppProps} from 'next/app';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import {withScalars} from 'apollo-link-scalars';
import introspectionResult from '../types/graphql.schema.json';
import {buildClientSchema, IntrospectionQuery} from 'graphql';
import {GraphQLDateTime, GraphQLDate} from 'graphql-scalars';
import {AppContext, AppContextT} from '../components/useAppContext';
import {StepsStyleConfig as Steps} from 'chakra-ui-steps';
import Head from 'next/head';
import Script from 'next/script';

const App = ({Component, pageProps}: AppProps) => {
  const client = useMemo(() => initializeApollo(), []);
  const context = useState<AppContextT>({});

  const theme = extendTheme({
    components: {
      Steps,
    },
    styles: {
      global: {
        body: {
          backgroundColor: 'gray.50',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <AppContext.Provider value={context}>
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
        </AppContext.Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function initializeApollo() {
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
