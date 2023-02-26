import React from 'react';
import {Container} from '@chakra-ui/react';
import Head from 'next/head';

export default function Page({children}: {children: React.ReactNode}) {
  return (
    <Container maxW="container.md" pt="10" pb="20">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kulturspektakel Gauting</title>
      </Head>
      {children}
    </Container>
  );
}
