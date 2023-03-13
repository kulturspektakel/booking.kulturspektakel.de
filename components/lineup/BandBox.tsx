import React, {useEffect, useRef} from 'react';
import {gql} from '@apollo/client';
import {BandBoxFragment} from '../../types/graphql';
import {Box, Heading, Link} from '@chakra-ui/react';
import TimeString from '../TimeString';
import Image from 'next/image';
import NextLink from 'next/link';

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
  isHighlighted,
  onHighlight,
}: {
  href: string;
  band: BandBoxFragment;
  isHighlighted: boolean;
  onHighlight: (value: undefined) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isHighlighted && ref.current != null) {
      ref.current.scrollIntoView({behavior: 'smooth', block: 'center'});
      ref.current.focus();
      onHighlight(undefined);
    }
  }, [ref, isHighlighted, onHighlight]);

  return (
    <Link
      as={NextLink}
      href={href}
      ref={ref}
      display="inline-block"
      m="1.5"
      mb="0"
      borderRadius="xl"
    >
      <Box
        color={band.area.id === 'Area:dj' ? 'white' : undefined}
        borderRadius="xl"
        bg={band.area.themeColor}
        p="4"
        pe="6"
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
  );
}
