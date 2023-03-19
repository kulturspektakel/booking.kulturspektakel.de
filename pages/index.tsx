import React from 'react';
import Page from '../components/Page';
import {gql} from '@apollo/client';
import {useNewsQuery} from '../types/graphql';
import Article from '../components/news/Article';
import {Box, Button, Center} from '@chakra-ui/react';
import Link from 'next/link';

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

export default function News() {
  const {data} = useNewsQuery();
  return (
    <Page>
      {data?.news.edges.map((edge, i) => (
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
