import React from 'react';
import Page from '../../components/Page';
import {gql} from '@apollo/client';
import {useNewsArchiveQuery} from '../../types/graphql';
import ArticleHead from '../../components/news/ArticleHead';
import {Heading, List, ListItem} from '@chakra-ui/react';

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

export default function Events() {
  const {data} = useNewsArchiveQuery();
  return (
    <Page>
      <List>
        {data?.news.edges.map(({node}, i) => (
          <>
            {(i === 0 ||
              data.news.edges[i - 1].node.createdAt.getFullYear() !==
                node.createdAt.getFullYear()) && (
              <Heading mt="8" mb="8" textAlign="center">
                {node.createdAt.getFullYear()}
              </Heading>
            )}
            <ListItem mb="4">
              <ArticleHead
                key={node.slug}
                title={node.title}
                createdAt={node.createdAt}
                slug={node.slug}
              />
            </ListItem>
          </>
        ))}
      </List>
    </Page>
  );
}
