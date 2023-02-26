import React, {useMemo} from 'react';

import {gql} from '@apollo/client';
import {LineupDetailsFragment, useLineupTableQuery} from '../../types/graphql';

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
      genre
      name
      area {
        id
      }
    }
  }
`;

export default function Event(props: LineupDetailsFragment) {
  const {data} = useLineupTableQuery();

  const areas = useMemo(() => {
    const activeAreas = new Set(props.bandsPlaying.map((b) => b.area.id));
    return data?.areas.filter((a) => activeAreas.has(a.id));
  }, [data?.areas, props.bandsPlaying]);

  //   const days = useMemo(() => {
  //     props.bandsPlaying.
  //   }, [props.bandsPlaying]);

  return (
    <ol>
      {areas?.map((a) => (
        <li key={a.id}>{a.displayName}</li>
      ))}
    </ol>
  );
}
