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
import {GetStaticProps} from 'next';
import Link, {LinkProps} from 'next/link';
import React from 'react';
import Page from '../components/booking/Page';
import {EventQuery} from '../types/graphql';
import {initializeApollo} from './_app';

export const EVENT_ID = 'Event:kult2023';

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
        <Button m="3" mr="0" isDisabled={disabled} colorScheme="blue">
          {buttonLabel}
        </Button>
      </Link>
    </Flex>
  );
}

type Props = Extract<EventQuery['node'], {__typename?: 'Event'}>;

export default function Home(props: Props) {
  let errorMessage: string | null = null;
  const now = new Date();
  const bandApplicationEnded =
    (props.bandApplicationEnd && props.bandApplicationEnd < now) ?? false;
  const djApplicationEnded =
    (props.djApplicationEnd && props.djApplicationEnd < now) ?? false;

  if (!props.bandApplicationStart) {
    errorMessage = 'Aktuell läuft die Bewerbungsphase nicht.';
  } else if (props.bandApplicationStart > now) {
    errorMessage = `Die Bewerbungsphase beginnt am ${props.bandApplicationStart.toLocaleDateString(
      'de',
    )}`;
  } else if (bandApplicationEnded && djApplicationEnded) {
    errorMessage = `Die Bewerbungsphase für das ${props.name} ist beendet.`;
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
              {props.start.toLocaleDateString('de', {day: '2-digit'})}. bis{' '}
              {props.end.toLocaleDateString('de', {
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

        {props.bandApplicationEnd && (
          <BBox
            applicationStart={props.bandApplicationEnd}
            title="Bands"
            content="Ihr möchtet euch als Band für eine unserer Bühnen bewerben."
            buttonLabel="Als Band bewerben"
            href="/booking/band"
            disabled={bandApplicationEnded}
          />
        )}

        {props.djApplicationEnd && (
          <BBox
            applicationStart={props.djApplicationEnd}
            title="DJs"
            content="Du möchtest dich als DJ für unsere DJ-Area bewerben."
            buttonLabel="Als DJ bewerben"
            href="/booking/dj"
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = initializeApollo();

  const res = await client.query<EventQuery>({
    query: gql`
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
