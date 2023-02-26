import React, {useEffect} from 'react';
import Page from '../Page';
import {useRouter} from 'next/router';
import {HStack, Heading, Spacer, Divider, Box} from '@chakra-ui/react';
import Link from 'next/link';
import Head from 'next/head';

export default function BookingPage({children}: {children: React.ReactNode}) {
  const {query} = useRouter();

  useEffect(() => {
    const source = query['utm_source'];
    if (
      typeof window !== 'undefined' &&
      !window.sessionStorage.getItem('utm_source') &&
      source
    ) {
      window.sessionStorage.setItem('utm_source', String(source));
    }
  }, [query]);

  return (
    <Page>
      <Head>
        <title>Kulturspektakel Gauting</title>
      </Head>
      <HStack mb="5">
        <Heading size="lg">Bewerbungen</Heading>
        <Spacer />
        <Link href="/">
          <Box w={[20, 32, 40]} cursor="pointer">
            <img src="/logo.svg" width="100%" />
          </Box>
        </Link>
      </HStack>
      <Divider mb="5" />
      {children}
    </Page>
  );
}
