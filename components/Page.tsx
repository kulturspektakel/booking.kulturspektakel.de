import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Show,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {PageDocument, PageQuery} from '../types/graphql';
import DateString from './DateString';
import {HamburgerIcon} from '@chakra-ui/icons';
import NextLink from 'next/link';
import Image from 'next/image';
import logo from './logo.svg';
import halftone from './halftone.svg';
import logoTextRight from './logo-text-right-black.svg';

gql`
  query Page {
    events(limit: 1, type: Kulturspektakel) {
      start
      end
    }
  }
`;

const menuItems = [
  {label: 'Home', href: '/'},
  {label: 'Lineup', href: '/lineup'},
  {label: 'Angebot', href: '/angebot'},
  {label: 'Events', href: '/events'},
  {label: 'Mitmachen', href: '/mitmachen'},
];

const footerItems = [
  {label: 'Design', href: '/logo'},
  {label: 'Förderverein', href: '/foerderverein'},
  {label: 'Datenschutz', href: '/datenschutz'},
  {label: 'Impressum', href: '/impressum'},
];

export default function Page({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const {pathname} = useRouter();
  const {data} = useSuspenseQuery_experimental<PageQuery>(PageDocument, {});
  const event = data.events.at(0);

  const isLanding = pathname === '/';

  return (
    <Flex direction="column" minH="100vh" position="sticky" top="0">
      <VStack
        bg="brand.900"
        p="4"
        h={isLanding ? '85vh' : undefined}
        position="relative"
      >
        {isLanding && (
          <Image
            src={halftone}
            fill
            style={{
              objectFit: 'cover',
              // mixBlendMode: 'lighten',
              opacity: 0.05,
            }}
            alt=""
          />
        )}
        <Show below="md">
          <IconButton aria-label="Search database" icon={<HamburgerIcon />} />
        </Show>
        {isLanding && (
          <Center flexDirection="column" textAlign="center" flexGrow={1}>
            <Image
              src={logo}
              style={{position: 'relative', zIndex: 2, width: '50vw'}}
              alt="Kulturspektakel Logo"
            />
            {event != null && (
              <Text color="whiteAlpha.700" fontSize="2em">
                <DateString
                  date={event.start}
                  to={event.end}
                  until="-"
                  options={{
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }}
                />
              </Text>
            )}
          </Center>
        )}
        <List gap="6" display="flex" justifyContent="center">
          {menuItems.map(({label, href}, i) => (
            <ListItem key={i} display="inline-block">
              <Button
                as={NextLink}
                href={href}
                borderRadius="full"
                fontWeight="bold"
              >
                {label}
              </Button>
            </ListItem>
          ))}
        </List>
      </VStack>
      <Container maxW="container.md" pt="10" pb="20" flexGrow="1">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Kulturspektakel Gauting</title>
        </Head>
        {title != null && (
          <Heading mb="8" textAlign="center">
            {title}
          </Heading>
        )}
        {children}
      </Container>
      <Box as="footer" bg="gray.200" p="10">
        <Container maxW="container.md">
          <Image width={150} src={logoTextRight} />
          <Text>
            Das Kult ist ein dreitägiges ehrenamtlich von Jugendlichen
            organisiertes Musikfestival in Gauting.
          </Text>
          <Text>gefördert von</Text>
          <List>
            {footerItems.map(({label, href}, i) => (
              <ListItem key={i}>
                <Link as={NextLink} href={href}>
                  {label}
                </Link>
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </Flex>
  );
}
