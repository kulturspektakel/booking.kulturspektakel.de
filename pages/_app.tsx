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

const App = ({Component, pageProps}: AppProps) => {
  const client = useMemo(() => initializeApollo(), []);
  const context = useState<AppContextT>({});

  const theme = extendTheme({
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
