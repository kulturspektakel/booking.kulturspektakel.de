import React from 'react';
import {gql} from '@apollo/client';
import {ArticleFragment} from '../../types/graphql';
import {Text, Heading, Box} from '@chakra-ui/react';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import ArticleHead from './ArticleHead';

gql`
  fragment Article on News {
    slug
    title
    createdAt
    content
  }
`;

export default function Article(props: ArticleFragment) {
  return (
    <Box mb="8">
      <ArticleHead title={props.title} createdAt={props.createdAt} />
      <ReactMarkdown
        components={{
          h1: Heading,
          h2: Heading,
          p: Text,
          //   img: Image,
        }}
      >
        {props.content}
      </ReactMarkdown>
    </Box>
  );
}
