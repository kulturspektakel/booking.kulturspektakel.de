import React from 'react';
import Page from '../components/Page';
import {gql} from '@apollo/client';
import {useNewsQuery} from '../types/graphql';
import Article from '../components/news/Article';
import {Button} from '@chakra-ui/react';
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
      {data?.news.edges.map((edge) => (
        <Article key={edge.node.slug} {...edge.node} />
      ))}
      <Link href="/news/archiv">
        <Button>Ältere Beträge</Button>
      </Link>
    </Page>
  );
}
