import React from 'react';

import {gql} from '@apollo/client';
import {LineUpStaticPathsQuery, useLineupQuery} from '../../../types/graphql';
import Page from '../../../components/Page';
import LineupTable from '../../../components/lineup/LineupTable';
import {useRouter} from 'next/router';
import {Select} from '@chakra-ui/react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';

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

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export default function Lineup(props: Props) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo();
  const lineup = await client.query<LineUpStaticPathsQuery>({
    query: gql`
      query LineUpStaticPaths {
        events(type: Kulturspektakel) {
          id
          start
        }
      }
    `,
  });

  return {
    paths: lineup.data.events.map((n) => ({
      params: {year: String(n.start.getFullYear())},
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {},
  };
};
