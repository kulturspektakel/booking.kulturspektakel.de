import React from 'react';
import Page from '../../components/Page';

import {gql} from '@apollo/client';
import {usePostersQuery} from '../../types/graphql';
import Event from '../../components/events/Event';

gql`
  query Posters {
    events(type: Kulturspektakel) {
      id
      start
    }
  }
`;

export default function Poster() {
  const {data} = usePostersQuery();
  return (
    <Page>
      <ol>
        {data?.events.map((e) => (
          <Event {...e} key={e.id} />
        ))}
      </ol>
    </Page>
  );
}
