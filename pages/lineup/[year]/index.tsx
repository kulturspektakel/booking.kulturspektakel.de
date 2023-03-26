import React, {useEffect} from 'react';
import {gql} from '@apollo/client';
import {
  LineUpStaticPathsQuery,
  LineupTableDocument,
  LineupTableQuery,
} from '../../../types/graphql';
import Page from '../../../components/Page';
import {useRouter} from 'next/router';
import {Heading, HStack, Spacer} from '@chakra-ui/react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';
import LineupTable from '../../../components/lineup/LineupTable';
import YearSelector from '../../../components/lineup/YearSelector';

type Props = {
  data: LineupTableQuery;
  eventId: string;
};

gql`
  query LineupTable($id: ID!) {
    areas {
      ...AreaPill
    }
    events(type: Kulturspektakel) {
      ...YearSelector
    }
    event: node(id: $id) {
      ... on Event {
        id
        name
        start
        end
        ...LineupTable
      }
    }
  }
`;

export default function LineupPage({data, eventId}: Props) {
  const {events, query} = useRouter();

  useEffect(() => {
    const a = (url, {shallow}) => {
      console.log(`routing to ${url}`, `is shallow routing: ${shallow}`);
    };
    events.on('routeChangeStart', a);

    const b = (url, {shallow}) => {
      console.log(`routing complete ${url}`, `is shallow routing: ${shallow}`);
    };

    events.on('routeChangeComplete', b);

    () => {
      events.off('routeChangeStart', a);
      events.off('routeChangeStart', b);
    };
  }, [events]);

  const event = data.event;
  if (event?.__typename !== 'Event') {
    throw new Error();
  }

  return (
    <Page>
      <HStack>
        <Heading as="h1">Lineup&nbsp;{query.year}</Heading>
        <Spacer />
        <YearSelector currentEventId={eventId} events={data.events} />
      </HStack>
      <LineupTable event={event} areas={data.areas} />
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

type ParsedUrlQuery = {
  year: string;
};

export const getStaticProps: GetStaticProps<Props, ParsedUrlQuery> = async (
  ctx,
) => {
  const client = initializeApollo();
  const eventId = `Event:kult${ctx.params?.year}`;

  const {data} = await client.query<LineupTableQuery>({
    query: LineupTableDocument,
    variables: {
      id: eventId,
    },
  });

  return {
    props: {data, eventId},
  };
};
