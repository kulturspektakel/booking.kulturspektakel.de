import React, {Suspense} from 'react';
import {gql} from '@apollo/client';
import {LineUpStaticPathsQuery} from '../../../types/graphql';
import Page from '../../../components/Page';
import {useRouter} from 'next/router';
import {Center, Spinner} from '@chakra-ui/react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';
import LineupTable from '../../../components/lineup/LineupTable';
import YearSelector from '../../../components/lineup/YearSelector';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export default function LineupPage(props: Props) {
  const {query} = useRouter();
  const id = `Event:kult${query.year}`;

  return (
    <Page>
      <Suspense fallback={null}>
        <YearSelector eventId={id} />
      </Suspense>
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
