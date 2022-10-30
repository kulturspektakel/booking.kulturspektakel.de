import {gql} from '@apollo/client';
import {VStack, Heading, Text, Img} from '@chakra-ui/react';
import React from 'react';
import {EVENT_ID} from '.';
import Confetti from '../components/Confetti';
import Page from '../components/Page';
import useIsDJ from '../components/useIsDJ';
import {useThanksQuery} from '../types/graphql';

gql`
  query Thanks($id: ID!) {
    node(id: $id) {
      ... on Event {
        bandApplicationEnd
        djApplicationEnd
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
  const isDJ = useIsDJ();

  const applicationEnd = isDJ
    ? data?.node?.__typename === 'Event' && data.node.djApplicationEnd
    : data?.node?.__typename === 'Event' && data.node.bandApplicationEnd;

  return (
    <Page>
      <Confetti />
      <VStack spacing="5" textAlign="center">
        <Img src={isDJ ? '/genre/disco.svg' : '/genre/metal.svg'} width="16" />
        <Heading size="lg">
          Danke für {isDJ ? 'deine' : 'eure'} Bewerbung!
        </Heading>
        <Text>
          Wir haben dir soeben eine E-Mail zur Bestätigung geschickt. Wir
          beantworten jede Bewerbung, allerdings kann es bis nach dem
          Bewerbungsschluss am{' '}
          {applicationEnd &&
            applicationEnd.toLocaleDateString('de', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Europe/Berlin',
            })}{' '}
          dauern, bis wir uns bei dir melden.
        </Text>
      </VStack>
    </Page>
  );
}
