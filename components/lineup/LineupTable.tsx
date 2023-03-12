import React, {useMemo, useState} from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {LineupTableDocument, LineupTableQuery} from '../../types/graphql';
import {Heading, HStack, List, ListItem, Spacer} from '@chakra-ui/react';
import BandSearch from './BandSearch';
import DateString, {isSameDay} from '../DateString';
import BandBox from './BandBox';
import AreaPill from './AreaPill';

gql`
  query LineupTable($id: ID!) {
    areas {
      ...AreaPill
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
              slug
              ...BandBox
            }
          }
        }
      }
    }
  }
`;

export default function LineupTable(props: {eventId: string}) {
  const {data} = useSuspenseQuery_experimental<LineupTableQuery>(
    LineupTableDocument,
    {
      variables: {
        id: props.eventId,
      },
    },
  );

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
      <List>
        <HStack mt="4">
          {areas?.map((a) => (
            <AreaPill
              area={a}
              isSelected={a.id === stage}
              onChange={selectStage}
              key={a.id}
            />
          ))}
          <Spacer />
          <BandSearch />
        </HStack>
        {days.map((day) => (
          <ListItem key={day.toDateString()}>
            <Heading textAlign="center" mt="8" mb="" textTransform="uppercase">
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
                  <BandBox
                    href={`${props.eventId.replace(/[^\d]/g, '')}/${node.slug}`}
                    key={node.id}
                    band={node}
                  />
                ))}
            </List>
          </ListItem>
        ))}
      </List>
    </>
  );
}
