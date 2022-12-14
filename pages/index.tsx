import {gql} from '@apollo/client';
import {WarningTwoIcon} from '@chakra-ui/icons';
import {
  VStack,
  Text,
  Button,
  Heading,
  Link as ChakraLink,
  AlertIcon,
  Alert,
  AlertDescription,
  Box,
  Spacer,
  Flex,
  Tag,
} from '@chakra-ui/react';
import Link, {LinkProps} from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import Page from '../components/Page';
import {useEventQuery} from '../types/graphql';

export const EVENT_ID = 'Event:kult2023';

gql`
  query Event($id: ID!) {
    node(id: $id) {
      ... on Event {
        name
        start
        end
        bandApplicationStart
        bandApplicationEnd
        djApplicationEnd
      }
    }
  }
`;

function BBox({
  href,
  disabled,
  buttonLabel,
  applicationStart,
  title,
  content,
}: {
  href: LinkProps['href'];
  title: string;
  content: string;
  disabled: boolean;
  buttonLabel: string;
  applicationStart: Date;
}) {
  return (
    <Flex
      mt="5"
      alignItems="center"
      direction={{base: 'column', sm: 'row'}}
      bg="white"
      borderRadius="lg"
      p="4"
      shadow="xs"
    >
      <VStack align="start">
        <Heading size="sm" textAlign="left">
          {title}
        </Heading>
        <Text>
          {content}
          <br />
          <strong>Bewerbungsschluss:</strong>{' '}
          {disabled ? (
            <Tag colorScheme="red">
              <WarningTwoIcon />
              &nbsp;Abgelaufen
            </Tag>
          ) : (
            applicationStart.toLocaleDateString('de', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Europe/Berlin',
            })
          )}
        </Text>
      </VStack>
      <Spacer />
      <Link href={href}>
        <Button m="3" mr="0" disabled={disabled} colorScheme="blue">
          {buttonLabel}
        </Button>
      </Link>
    </Flex>
  );
}

export default function Home() {
  const {data} = useEventQuery({
    variables: {
      id: EVENT_ID,
    },
  });

  const {query} = useRouter();

  const event = data?.node?.__typename === 'Event' ? data.node : undefined;
  if (!event) {
    return null;
  }

  let errorMessage: string | null = null;
  const now = new Date();
  const bandApplicationEnded =
    (event.bandApplicationEnd && event.bandApplicationEnd < now) ?? false;
  const djApplicationEnded =
    (event.djApplicationEnd && event.djApplicationEnd < now) ?? false;

  if (!event.bandApplicationStart) {
    errorMessage = 'Aktuell läuft die Bewerbungsphase nicht.';
  } else if (event.bandApplicationStart > now) {
    errorMessage = `Die Bewerbungsphase beginnt am ${event.bandApplicationStart.toLocaleDateString(
      'de',
    )}`;
  } else if (bandApplicationEnded && djApplicationEnded) {
    errorMessage = `Die Bewerbungsphase für das ${event.name} ist beendet.`;
  }

  return (
    <Page>
      <Box>
        <VStack spacing="5">
          <Heading size="md" mt="4">
            Band- und DJ-Bewerbungen
          </Heading>
          <Text>
            Das Kulturspektakel Gauting findet vom{' '}
            <strong>
              {event.start.toLocaleDateString('de', {day: '2-digit'})}. bis{' '}
              {event.end.toLocaleDateString('de', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </strong>{' '}
            statt. Die Bewerbung für einen Auftritt beim Kulturspektakel ist
            ausschließlich über dieses Bewerbungsformular möglich. Alle anderen
            Anfragen bitte per E-Mail an{' '}
            <ChakraLink href="mailto:info@kulturspektakel.de" color="red.500">
              info@kulturspektakel.de
            </ChakraLink>
            .
          </Text>
          <Text>
            Nach dem Absenden des Formulars wird sich unser Booking-Team per
            E-Mail bei euch melden. Allerdings voraussichtlich erst nach Ablauf
            der Bewerbungsfrist.
          </Text>
        </VStack>

        {event.bandApplicationEnd && (
          <BBox
            applicationStart={event.bandApplicationEnd}
            title="Bands"
            content="Ihr möchtet euch als Band für eine unserer Bühnen bewerben."
            buttonLabel="Als Band bewerben"
            href={{pathname: '/schritt1', query}}
            disabled={bandApplicationEnded}
          />
        )}

        {event.djApplicationEnd && (
          <BBox
            applicationStart={event.djApplicationEnd}
            title="DJs"
            content="Du möchtest dich als DJ für unsere DJ-Area bewerben."
            buttonLabel="Als DJ bewerben"
            href={{pathname: '/schritt1', query: {...query, dj: 1}}}
            disabled={djApplicationEnded}
          />
        )}

        {errorMessage && (
          <Alert status="warning" borderRadius="md" mt="5">
            <AlertIcon />
            <AlertDescription color="yellow.900">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </Page>
  );
}
