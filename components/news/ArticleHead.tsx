import React from 'react';
import {gql} from '@apollo/client';
import {Text, Heading} from '@chakra-ui/react';
import Link from 'next/link';
import DateString from '../DateString';

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
          <DateString date={props.createdAt} />
        </Text>
      </Link>
    </>
  );
}
