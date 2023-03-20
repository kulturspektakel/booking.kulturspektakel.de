import React, {useState} from 'react';
import {gql} from '@apollo/client';
import {BandBoxFragment} from '../../types/graphql';
import {Box, Heading, Text, Link} from '@chakra-ui/react';
import TimeString from '../TimeString';
import Image from 'next/image';
import NextLink from 'next/link';
import Mark from '../Mark';

gql`
  fragment BandBox on BandPlaying {
    id
    genre
    name
    startTime
    photo {
      uri
    }
    area {
      id
      displayName
      themeColor
    }
  }
`;

export default function BandBox({
  band,
  href,
}: {
  href: string;
  band: BandBoxFragment;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      as={NextLink}
      display="inline-block"
      borderRadius="xl"
      overflow="hidden"
      m="1.5"
      mb="0"
      href={href}
      color={hover && band.area.id === 'Area:dj' ? 'white' : undefined}
      bg="gray.100"
      p="4"
      pe="6"
      h="40"
      maxW="300"
      position="relative"
      _hover={{
        textDecoration: 'none',
        bgColor: band.area.themeColor,
      }}
      _focusVisible={{
        outlineColor: 'black',
      }}
      _active={{
        outlineColor: 'black',
      }}
    >
      <Box zIndex="3" position="relative">
        <Text fontWeight="bold">
          <TimeString date={band.startTime} />
          &nbsp;
          <Mark bgColor={band.area.themeColor}>{band.area.displayName}</Mark>
        </Text>
        <Heading
          size="lg"
          lineHeight="1"
          pt="0.2"
          pb="0.5"
          noOfLines={3}
          fontWeight="bold"
        >
          {band.name}
        </Heading>
        {band.genre}
      </Box>
      {hover && (
        <Box
          bgGradient={`linear(to-b, ${band.area.themeColor}, transparent)`}
          position="absolute"
          left="0"
          top="0"
          right="0"
          h="60"
          zIndex="2"
        />
      )}
      {hover && band.photo != null && (
        <Image
          src={band.photo.uri}
          alt=""
          sizes="300px"
          quality={50}
          fill
          style={{
            filter: `grayscale(1)`,
            opacity: 0.8,
            objectFit: 'cover',
            objectPosition: '0 30%',
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />
      )}
    </Link>
  );
}
