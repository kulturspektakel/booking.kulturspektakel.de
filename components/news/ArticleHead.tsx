import React from 'react';
import {gql} from '@apollo/client';
import {Heading} from '@chakra-ui/react';
import Link from 'next/link';
import DateString from '../DateString';
import Mark from '../Mark';
import {ArticleHeadFragment} from '../../types/graphql';

gql`
  fragment ArticleHead on News {
    slug
    title
    createdAt
  }
`;

export default function ArticleHead(props: ArticleHeadFragment) {
  return (
    <>
      <Heading size="lg">{props.title}</Heading>
      <Link href={`/news/${props.slug}`}>
        <Mark>
          <DateString
            options={{
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }}
            date={props.createdAt}
          />
        </Mark>
      </Link>
    </>
  );
}
