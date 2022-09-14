import {gql} from '@apollo/client';
import {VStack, Heading, Text, Img} from '@chakra-ui/react';
import React from 'react';
import {EVENT_ID} from '.';
import Page from '../components/Page';
import {useThanksQuery} from '../types/graphql';

gql`
  query Thanks($id: ID!) {
    node(id: $id) {
      ... on Event {
        bandApplicationEnd
      }
    }
  }
`;

export default function Thanks() {
  const {data} = useThanksQuery({
    variables: {
      id: EVENT_ID,
    },
  });

  return (
    <Page>
      <VStack spacing="5" textAlign="center">
        <Img src="/genre/metal.svg" width="16" />
        <Heading size="lg">Danke für eure Bewerbung!</Heading>
        <Text>
          Wir haben dir soeben eine E-Mail zur Bestätigung geschickt. Wir
          beantworten jede Bewerbung, allerdings kann es bis nach dem
          Bewerbungsschluss am{' '}
          {data?.node?.__typename === 'Event' &&
            data.node.bandApplicationEnd?.toLocaleDateString('de', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Europe/Berlin',
            })}{' '}
          dauern, bis wir uns bei euch melden.
        </Text>
      </VStack>
    </Page>
  );
}
