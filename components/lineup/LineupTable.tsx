import React, {useCallback, useMemo, useState} from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {
  BandSerachQuery,
  LineupTableDocument,
  LineupTableQuery,
} from '../../types/graphql';
import {Heading, HStack, List, ListItem, Spacer} from '@chakra-ui/react';
import BandSearch from './BandSearch';
import DateString, {isSameDay} from '../DateString';
import BandBox from './BandBox';
import AreaPill from './AreaPill';
import {useRouter} from 'next/router';

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
              event {
                id
              }
              ...BandBox
            }
          }
        }
      }
    }
  }
`;

export function yearFromEventId(eventId: string): string {
  return eventId.replace(/[^\d]/g, '');
}

type BS = BandSerachQuery['findBandPlaying'][number] | undefined;
function useBandSearchNavigation(eventId: string): [BS, (value: BS) => void] {
  const {push} = useRouter();
  const [band, setBand] = useState<BS>();
  const selectBand = useCallback(
    async (band: BS) => {
      if (band != null && band?.event.id !== eventId) {
        await push(yearFromEventId(band.event.id), undefined, {shallow: true});
      }
      setBand(band);
    },
    [eventId, push],
  );

  return [band, selectBand];
}

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

  const [band, selectBand] = useBandSearchNavigation(props.eventId);

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
          <BandSearch onSelect={selectBand} />
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
                    isHighlighted={node.id === band?.id}
                    onHighlight={selectBand}
                  />
                ))}
            </List>
          </ListItem>
        ))}
      </List>
    </>
  );
}
