import React from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {BandDetailDocument, BandDetailQuery} from '../../types/graphql';
import {Button, Heading, Text} from '@chakra-ui/react';
import {yearFromEventId} from './LineupTable';
import Image from 'next/image';
import NextLink from 'next/link';
import DateString from '../DateString';
import {ArrowBackIcon} from '@chakra-ui/icons';

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
      }
      area {
        displayName
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
      />{' '}
      {band.area.displayName}
      <Heading textTransform="uppercase">{band.name}</Heading>
      {band.genre}
      {band.photo && (
        <Image
          src={band.photo?.uri}
          width={400}
          height={200}
          alt={band.photo.title ?? ''}
        />
      )}
      <Text>{band.description}</Text>
    </>
  );
}
