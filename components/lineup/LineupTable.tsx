import React, {useCallback, useMemo, useState} from 'react';
import {gql} from '@apollo/client';
import {
  AreaPillFragment,
  BandSerachQuery,
  LineupTableFragment,
} from '../../types/graphql';
import {
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import BandSearch from './BandSearch';
import DateString, {isSameDay} from '../DateString';
import BandBox from './BandBox';
import AreaPill from './AreaPill';
import {useRouter} from 'next/router';

gql`
  fragment LineupTable on Event {
    id
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

export default function LineupTable({
  event,
  areas,
}: {
  event: LineupTableFragment;
  areas: AreaPillFragment[];
}) {
  const [band, selectBand] = useBandSearchNavigation(event.id);
  const [stage, selectStage] = useState<string | null>(null);

  const a = useMemo(() => {
    const activeAreas = new Set(
      event.bandsPlaying.edges.map(({node}) => node.area.id),
    );
    return areas.filter((a) => activeAreas.has(a.id));
  }, [areas, event.bandsPlaying.edges]);

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
      <HStack mt="4">
        {a.map((a) => (
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
      <List>
        {days.map((day) => (
          <ListItem key={day.getTime()}>
            <Heading textAlign="center" mt="16" mb="12">
              <DateString
                date={day}
                options={{
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                }}
              />
            </Heading>
            <SimpleGrid columns={{sm: 3, base: 2}} spacing={2}>
              {event.bandsPlaying.edges
                .filter(
                  ({node}) =>
                    isSameDay(node.startTime, day) &&
                    (stage === node.area.id || stage == null),
                )
                .map(({node}) => (
                  <BandBox
                    href={`${event.id.replace(/[^\d]/g, '')}/${node.slug}`}
                    key={node.id}
                    band={node}
                    isHighlighted={node.id === band?.id}
                    onHighlight={selectBand}
                  />
                ))}
            </SimpleGrid>
          </ListItem>
        ))}
      </List>
    </>
  );
}
