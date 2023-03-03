import React from 'react';
import {gql} from '@apollo/client';
import {ArticleFragment} from '../../types/graphql';
import {Text, Heading, Box} from '@chakra-ui/react';
import Link from 'next/link';

gql`
  fragment Article on News {
    slug
    title
    createdAt
    content
  }
`;

export default function ArticleHead(props: {
  title: string;
  createdAt: Date;
  slug?: string;
}) {
  return (
    <>
      <Heading textTransform="uppercase">{props.title}</Heading>
      <Link href={`/news/${props.slug}`}>
        <Text>
          <time dateTime={props.createdAt.toISOString()}>
            {props.createdAt.toLocaleDateString('de-DE')}
          </time>
        </Text>
      </Link>
    </>
  );
}
