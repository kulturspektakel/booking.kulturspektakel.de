import React from 'react';
import Page from '../../components/Page';

import {gql} from '@apollo/client';
import {useEventsQuery} from '../../types/graphql';
import Event from '../../components/events/Event';

gql`
  query Events {
    events(type: Other) {
      id
      ...EventDetails
    }
  }
`;

export default function Events() {
  const {data} = useEventsQuery();
  return (
    <Page>
      Neben dem Kult veranstalten wir ab und an noch weitere Events
      <ol>
        {data?.events.map((e) => (
          <Event {...e} key={e.id} />
        ))}
      </ol>
    </Page>
  );
}
