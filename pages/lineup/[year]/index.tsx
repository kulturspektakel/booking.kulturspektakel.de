import React from 'react';

import {gql} from '@apollo/client';
import {useLineupQuery} from '../../../types/graphql';
import Page from '../../../components/Page';
import LineupTable from '../../../components/lineup/LineupTable';

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
    }
  }
`;

export default function Lineup() {
  const {data} = useLineupQuery({
    variables: {
      id: `Event:kult2022`,
    },
  });
  return (
    <Page>
      <select>
        {data?.events?.map((e) => (
          <option key={e.id}>
            {e.start.toLocaleString('de-DE', {year: 'numeric'})}
          </option>
        ))}
      </select>
      {data?.node?.__typename === 'Event' && <LineupTable {...data?.node} />}
    </Page>
  );
}
