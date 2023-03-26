import React from 'react';
import {gql} from '@apollo/client';
import {ArticleFragment} from '../../types/graphql';
import {Text, Heading, Box} from '@chakra-ui/react';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import ArticleHead from './ArticleHead';

gql`
  fragment Article on News {
    slug
    title
    createdAt
    content
    ...ArticleHead
  }
`;

export default function Article(props: ArticleFragment) {
  return (
    <Box as="article" mb="10" mt="10">
      <ArticleHead
        title={props.title}
        createdAt={props.createdAt}
        slug={props.slug}
      />
      <Box mt="3">
        <ReactMarkdown
          components={{
            h1: Heading,
            h2: Heading,
            p: Text,
            img: (props) => null,
            // <Image src={props.src ?? ''} alt={props.alt ?? props.title ?? ''} />
          }}
        >
          {props.content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
