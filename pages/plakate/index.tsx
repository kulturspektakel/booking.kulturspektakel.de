import React from 'react';
import Page from '../../components/Page';

import {gql} from '@apollo/client';
import {usePostersQuery} from '../../types/graphql';
import {List, ListItem} from '@chakra-ui/react';
import Image from 'next/image';
import DateString from '../../components/DateString';

gql`
  query Posters {
    events(type: Kulturspektakel) {
      id
      start
      end
      poster {
        uri
        copyright
        title
      }
    }
  }
`;

export default function Poster() {
  const {data} = usePostersQuery();
  return (
    <Page>
      <List>
        {data?.events.map((e) => (
          <ListItem key={e.id}>
            {e.poster != null && (
              <>
                <Image
                  src={e.poster.uri}
                  alt={`Poster Kulturspektakel ${e.start.toLocaleDateString(
                    'de-DE',
                    {year: 'numeric'},
                  )}`}
                  width={100}
                  height={100}
                />
                {e.poster.copyright}
              </>
            )}
            Kulturspektakel&nbsp;
            {e.start.toLocaleDateString('de-DE', {year: 'numeric'})}
            <DateString date={e.start} to={e.end} />
          </ListItem>
        ))}
      </List>
    </Page>
  );
}
