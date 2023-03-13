import React, {Suspense} from 'react';
import {gql} from '@apollo/client';
import {LineUpStaticPathsQuery} from '../../../types/graphql';
import Page from '../../../components/Page';
import {useRouter} from 'next/router';
import {GetStaticPaths, GetStaticProps} from 'next';
import {initializeApollo} from '../../_app';
import BandDetail from '../../../components/lineup/BandDetail';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export default function BandPage(props: Props) {
  const {query} = useRouter();
  const eventId = `Event:kult${query.year}`;
  const slug = String(query.slug);

  return (
    <Page>
      <Suspense>
        <BandDetail eventId={eventId} slug={slug} />
      </Suspense>
    </Page>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const client = initializeApollo();
//   const lineup = await client.query<LineUpStaticPathsQuery>({
//     query: gql`
//       query LineUpStaticPaths {
//         events(type: Kulturspektakel) {
//           id
//           start
//         }
//       }
//     `,
//   });

//   return {
//     paths: lineup.data.events.map((n) => ({
//       params: {year: String(n.start.getFullYear())},
//     })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   return {
//     props: {},
//   };
// };
