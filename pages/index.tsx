import {gql} from '@apollo/client';
import {
  VStack,
  Text,
  Button,
  Center,
  Heading,
  Link as ChakraLink,
  AlertIcon,
  Alert,
  AlertDescription,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Page from '../components/Page';
import {useEventQuery} from '../types/graphql';

export const EVENT_ID = 'Event:kult2023';

gql`
  query Event($id: ID!) {
    node(id: $id) {
      ... on Event {
        start
        end
        bandApplicationStart
        bandApplicationEnd
        djApplicationEnd
      }
    }
  }
`;

export default function Home() {
  const {data} = useEventQuery({
    variables: {
      id: EVENT_ID,
    },
  });

  const event = data?.node?.__typename === 'Event' ? data.node : undefined;
  if (!event) {
    return null;
  }

  let errorMessage: string | null = null;
  const now = new Date();
  const bandApplicationEnded = event.bandApplicationEnd < now;
  const djApplicationEnded =
    event.djApplicationEnd && event.djApplicationEnd < now;

  if (!event.bandApplicationStart || !event.bandApplicationEnd) {
    errorMessage = 'Aktuell läuft die Bewerbungsphase nicht.';
  } else if (event.bandApplicationStart > now) {
    errorMessage = `Die Bewerbungsphase beginnt am ${event.bandApplicationStart.toLocaleDateString(
      'de',
    )}`;
  } else if (
    bandApplicationEnded &&
    (!event.djApplicationEnd || djApplicationEnded)
  ) {
    errorMessage = `Die Bewerbungsphase ist beendet.`;
  }

  return (
    <Page>
      <VStack spacing="5">
        <Heading size="md" mt="4">
          Das Kulturspektakel Gauting findet vom{' '}
          {event.start.toLocaleDateString('de', {day: '2-digit'})}. bis{' '}
          {event.end.toLocaleDateString('de', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}{' '}
          statt.
        </Heading>
        <Text>
          Die Bewerbung für einen Auftritt beim Kulturspektakel ist
          ausschließlich über dieses Bewerbungsformular möglich. Alle anderen
          Anfragen bitte per E-Mail an{' '}
          <ChakraLink href="mailto:info@kulturspektakel.de" color="red.500">
            info@kulturspektakel.de
          </ChakraLink>
          .
          {event.bandApplicationEnd && (
            <>
              {' '}
              Bewerbungsschluss ist der{' '}
              {event.bandApplicationEnd?.toLocaleDateString('de', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'Europe/Berlin',
              })}
              , trotzdem möchten wir euch dazu aufrufen eure Bewerbung so früh
              wie möglich einzureichen.
            </>
          )}
        </Text>
        <Text>
          Nach dem Absenden des Formulars wird sich unser Booking-Team per
          E-Mail bei euch melden. Allerdings voraussichtlich erst nach Ablauf
          der Bewerbungsfrist.
        </Text>
        <Center>
          {errorMessage ? (
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              <AlertDescription color="yellow.900">
                {errorMessage}
              </AlertDescription>
            </Alert>
          ) : (
            <Link href="/schritt1">
              <Button disabled={bandApplicationEnded} colorScheme="blue">
                Als Band bewerben
              </Button>
            </Link>
          )}

          {event.djApplicationEnd && (
            <Link href="/schritt1?dj">
              <Button colorScheme="blue" disabled={djApplicationEnded}>
                Als DJ bewerben
              </Button>
            </Link>
          )}
        </Center>
      </VStack>
    </Page>
  );
}
