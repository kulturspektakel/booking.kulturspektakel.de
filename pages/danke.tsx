import {VStack, Heading, Text, Img} from '@chakra-ui/react';
import React from 'react';
import Page from '../components/Page';

export default function Thanks() {
  return (
    <Page>
      <VStack spacing="5" textAlign="center">
        <Img src="/genre/metal.svg" width="16" />
        <Heading size="lg">Danke für eure Bewerbung!</Heading>
        <Text>
          Wir haben dir soeben eine E-Mail zur Bestätigung geschickt. Wir
          beantworten jede Bewerbung, allerdings kann es bis nach dem
          Bewerbungsschluss am ___ dauern, bis wir uns bei euch melden.
        </Text>
      </VStack>
    </Page>
  );
}
