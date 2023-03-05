import {gql} from '@apollo/client';
import {VStack, Heading, Text, Img} from '@chakra-ui/react';
import {GetStaticProps} from 'next';
import React from 'react';
import {getStaticPaths as gsp} from '.';
import {EVENT_ID} from '../..';
import Confetti from '../../../components/booking/Confetti';
import Page from '../../../components/booking/Page';
import useIsDJ from '../../../components/booking/useIsDJ';
import {ThanksQuery} from '../../../types/graphql';
import {initializeApollo} from '../../_app';

type Props = Extract<ThanksQuery['node'], {__typename?: 'Event'}>;

export default function Thanks(props: Props) {
  const isDJ = useIsDJ();

  const applicationEnd = isDJ
    ? props.djApplicationEnd
    : props.bandApplicationEnd;

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

export const getStaticPaths = gsp;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = initializeApollo();

  const res = await client.query<ThanksQuery>({
    query: gql`
      query Thanks($id: ID!) {
        node(id: $id) {
          ... on Event {
            bandApplicationEnd
            djApplicationEnd
          }
        }
      }
    `,
    variables: {
      id: EVENT_ID,
    },
  });

  if (res.data.node?.__typename === 'Event') {
    return {
      props: res.data.node,
    };
  }

  throw new Error(`Event ${EVENT_ID} not found`);
};
