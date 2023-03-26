import React from 'react';
import Page from '../../components/Page';

import {gql} from '@apollo/client';
import {EventsDocument, EventsQuery} from '../../types/graphql';
import {AspectRatio, Box, Heading, SimpleGrid, Text} from '@chakra-ui/react';
import {GetStaticProps} from 'next/types';
import {initializeApollo} from '../_app';
import {NotAllowedIcon} from '@chakra-ui/icons';
import DateString from '../../components/DateString';
import Image from 'next/image';
import Mark from '../../components/Mark';

gql`
  query Events {
    events {
      id
      name
      start
      end
      description
      poster {
        uri
        copyright
        width
        height
      }
    }
  }
`;

type Props = {
  data: EventsQuery;
};

export default function Events({data}: Props) {
  return (
    <Page title="Da ist noch mehr...">
      Neben dem Kult veranstalten wir ab und an noch weitere Events
      <SimpleGrid columns={2} spacing={6}>
        {data.events.map((e) => (
          <SimpleGrid columns={2} spacing={4} key={e.id}>
            <Box borderRadius="lg" boxShadow="sm" overflow="hidden">
              <AspectRatio ratio={1 / 1.4} bgColor="white">
                {e.poster != null ? (
                  <Image
                    src={e.poster.uri}
                    alt=""
                    width={e.poster.width}
                    height={e.poster.height}
                  />
                ) : (
                  <NotAllowedIcon boxSize="6" />
                )}
              </AspectRatio>
            </Box>
            <Box>
              <Heading mt="2" size="md">
                {e.name}
              </Heading>
              <Mark>
                <DateString
                  date={e.start}
                  to={e.end}
                  options={{
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }}
                />
              </Mark>
              {e.poster?.copyright != null && (
                <Text>Poster von {e.poster.copyright}</Text>
              )}
              <Text mt="2">{e.description}</Text>
            </Box>
          </SimpleGrid>
        ))}
      </SimpleGrid>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = initializeApollo();
  const {data} = await client.query<EventsQuery>({
    query: EventsDocument,
  });

  return {
    props: {data},
  };
};
