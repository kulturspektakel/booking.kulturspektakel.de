import React from 'react';
import Page from '../components/Page';
import {gql} from '@apollo/client';
import {NewsDocument, NewsQuery} from '../types/graphql';
import Article from '../components/news/Article';
import {Box, Button, Center} from '@chakra-ui/react';
import Link from 'next/link';
import {GetStaticProps} from 'next';
import {initializeApollo} from './_app';

gql`
  query News {
    news(first: 10) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
`;

type Props = {
  data: NewsQuery;
};

export default function News({data}: Props) {
  return (
    <Page>
      {data.news.edges.map((edge, i) => (
        <>
          {i > 0 && <Box as="hr" width="60%" m="auto" />}
          <Article key={edge.node.slug} {...edge.node} />
        </>
      ))}
      <Center>
        <Button href="/news/archiv" as={Link}>
          Ältere Beträge
        </Button>
      </Center>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = initializeApollo();
  const {data} = await client.query<NewsQuery>({
    query: NewsDocument,
  });

  return {
    props: {data},
  };
};
