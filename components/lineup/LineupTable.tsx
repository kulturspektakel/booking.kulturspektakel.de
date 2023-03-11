import React, {useMemo, useState} from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {LineupTableQuery} from '../../types/graphql';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  ScaleFade,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import BandSearch from './BandSearch';
import DateString, {isSameDay} from '../DateString';
import TimeString from '../TimeString';
import Image from 'next/image';
import Link from 'next/link';
import {CloseIcon} from '@chakra-ui/icons';

const LineupTableQ = gql`
  query LineupTable($id: ID!) {
    areas {
      id
      displayName
      themeColor
    }
    event: node(id: $id) {
      ... on Event {
        id
        name
        start
        end
        bandsPlaying(first: 100) {
          edges {
            node {
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
          }
        }
      }
    }
  }
`;

export default function LineupTable(props: {eventId: string}) {
  const {data} = useSuspenseQuery_experimental<LineupTableQuery>(LineupTableQ, {
    variables: {
      id: props.eventId,
    },
  });

  const event = data.event;
  if (event == null || event.__typename !== 'Event') {
    throw new Error();
  }

  const [stage, selectStage] = useState<string | null>(null);

  const areas = useMemo(() => {
    const activeAreas = new Set(
      event.bandsPlaying.edges.map(({node}) => node.area.id),
    );
    return data?.areas.filter((a) => activeAreas.has(a.id));
  }, [data?.areas, event.bandsPlaying]);

  const days = useMemo(
    () =>
      Array.from(
        event.bandsPlaying.edges.reduce(
          (acc, {node}) => acc.add(node.startTime.toDateString()),
          new Set<string>(),
        ),
      ).map((d) => new Date(d)),
    [event.bandsPlaying],
  );

  return (
    <>
      <BandSearch />
      <List>
        <List>
          {areas?.map((a) => (
            <Button
              size="lg"
              borderRadius="full"
              aria-pressed="false"
              key={a.id}
              onClick={() => selectStage(stage === a.id ? null : a.id)}
              bg={stage === a.id ? a.themeColor : undefined}
            >
              {a.displayName}
              <CloseIcon />
            </Button>
          ))}
        </List>
        {days.map((day) => (
          <ListItem key={day.toDateString()}>
            <Heading textAlign="center" mt="8" mb="8" textTransform="uppercase">
              <DateString
                date={day}
                options={{
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                }}
              />
            </Heading>
            <List>
              {event.bandsPlaying.edges
                .filter(
                  ({node}) =>
                    isSameDay(node.startTime, day) &&
                    (stage === node.area.id || stage == null),
                )
                .map(({node}) => (
                  <Box key={node.id} display="inline-block">
                    <ScaleFade initialScale={0.9} in={true}>
                      <Link href={``}>
                        <Box
                          color={
                            node.area.id === 'Area:dj' ? 'white' : undefined
                          }
                          borderRadius="xl"
                          bg={node.area.themeColor}
                          p="4"
                          pe="6"
                          m="2"
                          h="48"
                          maxW="300"
                          boxShadow="sm"
                          position="relative"
                          overflow="hidden"
                        >
                          <Box zIndex="3" position="relative">
                            <strong>
                              <TimeString date={node.startTime} />
                              &nbsp;
                              {node.area.displayName}
                            </strong>
                            <Heading
                              textTransform="uppercase"
                              lineHeight="0.9"
                              mt="1.5"
                              mb="-1"
                              noOfLines={3}
                            >
                              {node.name}
                            </Heading>
                            <strong>{node.genre}</strong>
                          </Box>
                          <Box
                            bgGradient={`linear(to-b, ${node.area.themeColor}, transparent)`}
                            position="absolute"
                            left="0"
                            top="0"
                            right="0"
                            h="60"
                            zIndex="2"
                          />
                          {node.photo != null && (
                            <Image
                              src={node.photo.uri}
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
                    </ScaleFade>
                  </Box>
                ))}
            </List>
          </ListItem>
        ))}
      </List>
    </>
  );
}
