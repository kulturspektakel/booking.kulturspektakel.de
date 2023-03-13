import {gql} from '@apollo/client';
import {GetStaticProps} from 'next';
import {yearFromEventId} from '../../components/lineup/LineupTable';
import {LineupRedirectQuery} from '../../types/graphql';
import {initializeApollo} from '../_app';

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();

  const res = await client.query<LineupRedirectQuery>({
    query: gql`
      query LineupRedirect {
        events(limit: 2, type: Kulturspektakel) {
          id
          bandsPlaying {
            totalCount
          }
        }
      }
    `,
  });
  const eventID =
    res.data.events[0].bandsPlaying.totalCount > 0
      ? res.data.events[0].id
      : res.data.events[1].id;

  return {
    redirect: {
      destination: `/lineup/${yearFromEventId(eventID)}`,
      permanent: false,
    },
  };
};

export default function Lineup() {
  return null;
}
