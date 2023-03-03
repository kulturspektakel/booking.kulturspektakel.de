import React from 'react';
import Page from '../../components/Page';
import {gql} from '@apollo/client';
import {useNewsSingleQuery} from '../../types/graphql';
import Article from '../../components/news/Article';
import {useRouter} from 'next/router';
import Head from 'next/head';

gql`
  query NewsSingle($id: ID!) {
    node(id: $id) {
      ... on News {
        ...Article
      }
    }
  }
`;

export default function NewsSingle() {
  const {query} = useRouter();
  const {data} = useNewsSingleQuery({
    variables: {
      id: `Slug:${query.slug}`,
    },
  });

  if (data?.node?.__typename === 'News') {
    return (
      <Page>
        {/* <Head></Head> */}
        <Article {...data.node} />
      </Page>
    );
  }
}
