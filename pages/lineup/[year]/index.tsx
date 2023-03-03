import React from 'react';

import {gql} from '@apollo/client';
import {useLineupQuery} from '../../../types/graphql';
import Page from '../../../components/Page';
import LineupTable from '../../../components/lineup/LineupTable';
import {useRouter} from 'next/router';
import {Select} from '@chakra-ui/react';

gql`
  query Lineup($id: ID!) {
    node(id: $id) {
      ... on Event {
        ...LineupDetails
      }
    }
    events(type: Kulturspektakel) {
      id
      start
      bandsPlaying {
        totalCount
      }
    }
  }
`;

export default function Lineup() {
  const {query, push} = useRouter();
  const id = `Event:kult${query.year}`;
  const {data} = useLineupQuery({
    variables: {
      id,
    },
  });
  return (
    <Page>
      <Select
        onChange={(e) => push(e.target.value.replace(/[^\d]/g, ''))}
        value={id}
      >
        {data?.events
          ?.filter((e) => e.bandsPlaying.totalCount > 0)
          .map((e) => (
            <option key={e.id} value={e.id}>
              {e.start.toLocaleString('de-DE', {year: 'numeric'})}
            </option>
          ))}
      </Select>
      {data?.node?.__typename === 'Event' && <LineupTable {...data?.node} />}
    </Page>
  );
}
