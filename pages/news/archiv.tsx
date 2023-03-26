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
      <SimpleGrid columns={3} spacing={4}>
        {data.news.edges.map(({node}, i) => (
          <>
            {(i === 0 ||
              data.news.edges[i - 1].node.createdAt.getFullYear() !==
                node.createdAt.getFullYear()) && (
              <Center>
                <Heading textAlign="center">
                  {node.createdAt.getFullYear()}
                </Heading>
              </Center>
            )}
            <Link href={`/news/${node.slug}`}>
              <AspectRatio ratio={1}>
                <Box
                  bg="white"
                  borderRadius="lg"
                  boxShadow="sm"
                  p="4"
                  transition=".15s all"
                  _hover={{
                    transform: 'scale(1.03) rotate(1deg)',
                    boxShadow: 'lg',
                  }}
                >
                  <Heading size="md">{node.title}</Heading>
                  <Mark>
                    <DateString
                      options={{
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }}
                      date={node.createdAt}
                    />
                  </Mark>
                </Box>
              </AspectRatio>
            </Link>
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
