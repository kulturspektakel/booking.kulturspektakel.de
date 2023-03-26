import React from 'react';
import Page from '../../components/Page';
import {gql} from '@apollo/client';
import {NewsArchiveDocument, NewsArchiveQuery} from '../../types/graphql';
import {Heading, Box, SimpleGrid, AspectRatio, Center} from '@chakra-ui/react';
import Link from 'next/link';
import DateString from '../../components/DateString';
import Mark from '../../components/Mark';
import {GetStaticProps} from 'next';
import {initializeApollo} from '../_app';
import Card from '../../components/Card';

gql`
  query NewsArchive {
    news(first: 200) {
      edges {
        node {
          title
          createdAt
          slug
        }
      }
    }
  }
`;

type Props = {
  data: NewsArchiveQuery;
};

export default function Events({data}: Props) {
  return (
    <Page title="News-Archiv">
      <SimpleGrid columns={4} spacing={4}>
        {data.news.edges.map(({node}, i) => (
          <>
            {(i === 0 ||
              data.news.edges[i - 1].node.createdAt.getFullYear() !==
                node.createdAt.getFullYear()) && (
              <Center key={node.createdAt.getFullYear()}>
                <Heading textAlign="center">
                  {node.createdAt.getFullYear()}
                </Heading>
              </Center>
            )}
            <Card
              key={node.slug}
              p="4"
              href={`/news/${node.slug}`}
              aspectRatio="1/1"
              textAlign="center"
              justifyContent="center"
            >
              <Heading size="md" mb="2" noOfLines={4}>
                {node.title}
              </Heading>
              <Mark alignSelf="center">
                <DateString
                  options={{
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }}
                  date={node.createdAt}
                />
              </Mark>
            </Card>
          </>
        ))}
      </SimpleGrid>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = initializeApollo();
  const {data} = await client.query<NewsArchiveQuery>({
    query: NewsArchiveDocument,
  });

  return {
    props: {data},
  };
};
