import React from 'react';
import {Box, Container, Flex} from '@chakra-ui/react';
import Head from 'next/head';

export default function Page({children}: {children: React.ReactNode}) {
  return (
    <Flex direction="column" minH="100vh">
      <Box bg="blue.800" p="10">
        <Container maxW="container.md">header</Container>
      </Box>
      <Container maxW="container.md" pt="10" pb="20" flexGrow="1">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Kulturspektakel Gauting</title>
        </Head>
        {children}
      </Container>
      <Box bg="blackAlpha.800" p="10">
        <Container maxW="container.md">footer</Container>
      </Box>
    </Flex>
  );
}
