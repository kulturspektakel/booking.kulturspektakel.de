import React, {useEffect, useRef} from 'react';
import {gql} from '@apollo/client';
import {BandBoxFragment} from '../../types/graphql';
import {Box, Heading, Text} from '@chakra-ui/react';
import TimeString from '../TimeString';
import Image from 'next/image';
import Mark from '../Mark';
import Card from '../Card';

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
  onHighlight,
  isHighlighted = false,
}: {
  onHighlight?: () => void;
  isHighlighted?: boolean;
  href: string;
  band: BandBoxFragment;
}) {
  const ref = useRef<any>();

  useEffect(() => {
    if (isHighlighted && onHighlight) {
      onHighlight();
    }
  }, [isHighlighted, onHighlight]);

  return (
    <Card
      borderRadius="xl"
      href={href}
      color={band.area.id === 'Area:dj' ? 'white' : undefined}
      bg="blackAlpha.800"
      p="4"
      pe="6"
      aspectRatio="1/1"
      position="relative"
      ref={ref}
    >
      <Mark
        zIndex="3"
        position="absolute"
        top="3"
        left="4"
        color="white"
        bgColor={band.area.themeColor}
      >
        <TimeString date={band.startTime} />
        &nbsp;
        {band.area.displayName}
      </Mark>

      <Box
        bgGradient={`linear(to-b, transparent, black)`}
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        top="0"
        p="4"
        pb="3"
        zIndex="2"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Heading
          size="lg"
          lineHeight="1"
          pt="0.2"
          pb="0.5"
          noOfLines={3}
          fontWeight="bold"
          color="white"
          sx={{hyphens: 'auto'}}
        >
          {band.name}
        </Heading>
        <Text noOfLines={1} color="white">
          {band.genre}
        </Text>
      </Box>
      {band.photo != null && (
        <Image
          src={band.photo.uri}
          alt=""
          sizes="300px"
          quality={50}
          fill
          style={{
            filter: `grayscale(1)`,
            objectFit: 'cover',
            objectPosition: '50% 30%',
            // mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />
      )}
    </Card>
  );
}
