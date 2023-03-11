import React, {Suspense} from 'react';
import {gql, useSuspenseQuery_experimental} from '@apollo/client';
import {LineupQuery, LineUpStaticPathsQuery} from '../../../types/graphql';
import Page from '../../../components/Page';
import {useRouter} from 'next/router';
import {Center, Select, Spinner} from '@chakra-ui/react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';
import LineupTable from '../../../components/lineup/LineupTable';

const LineUpQ = gql`
  query Lineup {
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

export default function LineupPage(props: Props) {
  const {query, push} = useRouter();
  const id = `Event:kult${query.year}`;

  const {data} = useSuspenseQuery_experimental<LineupQuery>(LineUpQ, {
    variables: {
      id,
    },
  });

  return (
    <Page>
      <Select
        onChange={(e) =>
          push(e.target.value.replace(/[^\d]/g, ''), '', {shallow: true})
        }
        value={id}
      >
        {data.events
          .filter((e) => e.bandsPlaying.totalCount > 0)
          .map((e) => (
            <option key={e.id} value={e.id}>
              {e.start.toLocaleString('de-DE', {year: 'numeric'})}
            </option>
          ))}
      </Select>
      <Suspense
        fallback={
          <Center>
            <Spinner />
          </Center>
        }
      >
        <LineupTable eventId={id} />
      </Suspense>
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
