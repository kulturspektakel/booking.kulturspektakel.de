import React from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {Select} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {YearSelectorQuery} from '../../types/graphql';
import {yearFromEventId} from './LineupTable';

const YearSelectorQ = gql`
  query YearSelector {
    events(type: Kulturspektakel) {
      id
      start
      bandsPlaying {
        totalCount
      }
    }
  }
`;

export default function YearSelector(props: {eventId: string}) {
  const {push} = useRouter();
  const {data} = useSuspenseQuery_experimental<YearSelectorQuery>(
    YearSelectorQ,
    {
      variables: {
        id: props.eventId,
      },
    },
  );

  return (
    <Select
      w="auto"
      onChange={(e) =>
        push(yearFromEventId(e.target.value), undefined, {shallow: true})
      }
      value={props.eventId}
    >
      {data.events
        .filter((e) => e.bandsPlaying.totalCount > 0)
        .map((e) => (
          <option key={e.id} value={e.id}>
            {e.start.toLocaleString('de-DE', {year: 'numeric'})}
          </option>
        ))}
    </Select>
  );
}
