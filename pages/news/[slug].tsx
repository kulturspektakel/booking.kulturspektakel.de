import React from 'react';
import Page from '../../components/Page';
import {gql} from '@apollo/client';
import {NewsSingleDocument, NewsSingleQuery} from '../../types/graphql';
import Article from '../../components/news/Article';
import Head from 'next/head';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../_app';

gql`
  query NewsSingle($id: ID!) {
    node(id: $id) {
      ... on News {
        ...Article
      }
    }
  }
`;

type Props = {
  data: NewsSingleQuery;
};

export default function NewsSingle({data}: Props) {
  if (data.node?.__typename === 'News') {
    return (
      <Page>
        {/* <Head></Head> */}
        <Article {...data.node} />
      </Page>
    );
  }
}

type ParsedUrlQuery = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  // TODO

  return {
    paths: [{params: {slug: 'plakatjagd'}}],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, ParsedUrlQuery> = async (
  ctx,
) => {
  const client = initializeApollo();
  const {data} = await client.query<NewsSingleQuery>({
    query: NewsSingleDocument,
    variables: {
      id: `News:${ctx.params?.slug}`,
    },
  });

  return {
    props: {data},
  };
};
