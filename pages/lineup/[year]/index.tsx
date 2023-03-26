import React from 'react';
import {gql} from '@apollo/client';
import {
  LineUpStaticPathsQuery,
  LineupTableDocument,
  LineupTableQuery,
} from '../../../types/graphql';
import Page from '../../../components/Page';
import {useRouter} from 'next/router';
import {Center, Heading, HStack, Spacer, Spinner} from '@chakra-ui/react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';
import LineupTable from '../../../components/lineup/LineupTable';
import YearSelector from '../../../components/lineup/YearSelector';
import useIsRouting from '../../../components/useIsRouting';

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
  const {query} = useRouter();
  const isRouting = useIsRouting();

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
      {isRouting === 'same-page' ? (
        <Center pt="16">
          <Spinner />
        </Center>
      ) : (
        <LineupTable event={event} areas={data.areas} />
      )}
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
