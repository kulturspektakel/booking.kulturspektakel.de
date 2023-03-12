import React from 'react';
import {gql} from '@apollo/client';
import {BandBoxFragment} from '../../types/graphql';
import {Box, Heading} from '@chakra-ui/react';
import TimeString from '../TimeString';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <Box display="inline-block">
      <Link href={href}>
        <Box
          // color={band.area.id === 'Area:dj' ? 'white' : undefined}
          borderRadius="xl"
          bg={band.area.themeColor}
          p="4"
          pe="6"
          m="1.5"
          mb="0"
          h="40"
          maxW="300"
          boxShadow="sm"
          position="relative"
          overflow="hidden"
        >
          <Box zIndex="3" position="relative">
            <strong>
              <TimeString date={band.startTime} />
              &nbsp;
              {band.area.displayName}
            </strong>
            <Heading
              as="h3"
              size="lg"
              textTransform="uppercase"
              lineHeight="0.9"
              mt="1.5"
              mb="-0.5"
              noOfLines={3}
            >
              {band.name}
            </Heading>
            <strong>{band.genre}</strong>
          </Box>
          <Box
            bgGradient={`linear(to-b, ${band.area.themeColor}, transparent)`}
            position="absolute"
            left="0"
            top="0"
            right="0"
            h="60"
            zIndex="2"
          />
          {band.photo != null && (
            <Image
              src={band.photo.uri}
              alt=""
              sizes="300px"
              quality={50}
              fill
              style={{
                filter: `grayscale(1)`,
                opacity: 0.7,
                objectFit: 'cover',
                objectPosition: '0 30%',
                mixBlendMode: 'overlay',
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Link>
    </Box>
  );
}
