import React from 'react';
import {gql} from '@apollo/client';
import {Select} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {yearFromEventId} from './LineupTable';
import {YearSelectorFragment} from '../../types/graphql';

gql`
  fragment YearSelector on Event {
    id
    start
    bandsPlaying {
      totalCount
    }
  }
`;

export default function YearSelector({
  events,
  currentEventId,
}: {
  currentEventId: string;
  events: YearSelectorFragment[];
}) {
  const {push} = useRouter();

  return (
    <Select
      fontWeight="semibold"
      bg="white"
      w="auto"
      onChange={(e) => push(yearFromEventId(e.target.value))}
      value={currentEventId}
    >
      {events
        .filter((e) => e.bandsPlaying.totalCount > 0)
        .map((e) => (
          <option key={e.id} value={e.id}>
            {e.start.toLocaleString('de-DE', {year: 'numeric'})}
          </option>
        ))}
    </Select>
  );
}
