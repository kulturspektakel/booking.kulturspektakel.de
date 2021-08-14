import {VStack, Text, Button, Center} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Page from '../components/Page';

export const DEADLINE = new Date('2022-02-25');

export default function Home() {
  return (
    <Page>
      <VStack spacing="2">
        <Text>
          Das Kulturspektakel Gauting findet vom 17.07. - 19.07.2022 statt.
        </Text>
        <Text>
          Dieses Bewerbungsformular ist für SolokünstlerInnen und Bands für das
          Kulturspektakel Gauting 2022. Nach dem Absenden des Formulars wird
          sich unser Booking-Team per E-Mail bei euch melden. Allerdings
          voraussichtlich erst nach Ablauf der Bewerbungsfrist.
        </Text>
        <Text>
          Bewerbungsschluss ist der 24.02.2022, trotzdem möchten wir euch dazu
          aufrufen eure Bewerbung so früh wie möglich einzureichen.
        </Text>
        <Center>
          <Link href="/schritt1">
            <Button colorScheme="blue">Jetzt Bewerben</Button>
          </Link>
        </Center>
      </VStack>
    </Page>
  );
}
