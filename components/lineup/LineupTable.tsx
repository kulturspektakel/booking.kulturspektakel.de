import React, {useMemo} from 'react';

import {gql} from '@apollo/client';
import {LineupDetailsFragment, useLineupTableQuery} from '../../types/graphql';
import {Box, Heading, List, ListItem} from '@chakra-ui/react';
import BandSearch from './BandSearch';
import {isSameDay} from '../DateString';
import TimeString from '../TimeString';

gql`
  query LineupTable {
    areas {
      id
      displayName
    }
  }

  fragment LineupDetails on Event {
    id
    name
    start
    end
    bandsPlaying(first: 100) {
      edges {
        node {
          genre
          name
          startTime
          area {
            id
            displayName
            themeColor
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
      <List>
        <List>
          {areas?.map((a) => (
            <ListItem key={a.id}>{a.displayName}</ListItem>
          ))}
        </List>
        {days.map((day) => (
          <ListItem key={day.toDateString()}>
            <Heading textAlign="center">
              {day.toLocaleDateString('de-DE', {weekday: 'long'})}
            </Heading>
            <List>
              {props.bandsPlaying.edges
                .filter(({node}) => isSameDay(node.startTime, day))
                .map(({node}) => (
                  <Box
                    key={node.name}
                    borderRadius="xl"
                    bg={node.area.themeColor}
                    p="5"
                    m="2"
                    display="inline-block"
                    boxShadow="sm"
                  >
                    <TimeString date={node.startTime} />
                    &nbsp;
                    {node.area.displayName}
                    <Heading>{node.name}</Heading>
                  </Box>
                ))}
            </List>
          </ListItem>
        ))}
      </List>
    </>
  );
}
