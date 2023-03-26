import React from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {BandDetailDocument, BandDetailQuery} from '../../types/graphql';
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import {yearFromEventId} from './LineupTable';
import Image from 'next/image';
import NextLink from 'next/link';
import DateString from '../DateString';
import {ArrowBackIcon} from '@chakra-ui/icons';
import Mark from '../Mark';

gql`
  query BandDetail($eventId: ID!, $slug: String!) {
    bandPlaying(eventId: $eventId, slug: $slug) {
      name
      description
      startTime
      genre
      photo {
        uri
        title
        width
        height
      }
      area {
        displayName
        themeColor
      }
    }
  }
`;

export default function BandDetail(props: {slug: string; eventId: string}) {
  const {data} = useSuspenseQuery_experimental<BandDetailQuery>(
    BandDetailDocument,
    {
      variables: {
        slug: props.slug,
        eventId: props.eventId,
      },
    },
  );

  const band = data.bandPlaying;
  if (band == null) {
    throw new Error();
  }

  return (
    <>
      <Button
        as={NextLink}
        href={`/lineup/${yearFromEventId(props.eventId)}`}
        leftIcon={<ArrowBackIcon />}
      >
        Lineup {yearFromEventId(props.eventId)}
      </Button>

      <Box>
        <DateString
          date={band.startTime}
          options={{
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }}
        />
        &nbsp;Uhr
        <Mark bgColor={band.area.themeColor}>{band.area.displayName}</Mark>
        <Heading>{band.name}</Heading>
        {band.genre}
      </Box>
      <SimpleGrid columns={2} spacing={6}>
        {band.photo && (
          <AspectRatio
            ratio={band.photo.width / band.photo.height}
            borderRadius="xl"
            overflow="hidden"
          >
            <Image src={band.photo?.uri} alt={band.photo.title ?? ''} fill />
          </AspectRatio>
        )}
        <Box>
          <Text>{band.description}</Text>
        </Box>
      </SimpleGrid>
    </>
  );
}
