import React, {useMemo} from 'react';

import {gql} from '@apollo/client';
import {LineupDetailsFragment, useLineupTableQuery} from '../../types/graphql';
import {Heading} from '@chakra-ui/react';
import BandSearch from './BandSearch';

gql`
  query LineupTable {
    areas {
      id
      displayName
    }
  }

  fragment LineupDetails on Event {
    name
    start
    end
    bandsPlaying {
      edges {
        node {
          genre
          name
          startTime
          area {
            id
          }
        }
      }
    }
  }
`;

export default function Event(props: LineupDetailsFragment) {
  const {data} = useLineupTableQuery();

  const areas = useMemo(() => {
    const activeAreas = new Set(
      props.bandsPlaying.edges.map(({node}) => node.area.id),
    );
    return data?.areas.filter((a) => activeAreas.has(a.id));
  }, [data?.areas, props.bandsPlaying]);

  const days = useMemo(
    () =>
      Array.from(
        props.bandsPlaying.edges.reduce(
          (acc, {node}) => acc.add(node.startTime.toDateString()),
          new Set<string>(),
        ),
      ).map((d) => new Date(d)),
    [props.bandsPlaying],
  );

  return (
    <>
      <BandSearch />
      {days.map((d) => (
        <li key={d.toDateString()}>
          <Heading textAlign="center">
            {d.toLocaleDateString('de-DE', {weekday: 'long'})}
          </Heading>
          <ol>
            {areas?.map((a) => (
              <li key={a.id}>{a.displayName}</li>
            ))}
          </ol>
        </li>
      ))}
    </>
  );
}
