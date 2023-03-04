import {gql, useApolloClient} from '@apollo/client';
import {Box, Input, Menu, MenuItem, Spinner, Stack} from '@chakra-ui/react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {BandSerachQuery} from '../../types/graphql';
import {TomoTypeaheadConfig, useTypeahead} from './TomoTypeahead';

export default function BandSearch() {
  const client = useApolloClient();

  const config: TomoTypeaheadConfig<
    BandSerachQuery['findBandPlaying'][number]
  > = useMemo(
    () => ({
      fetcher: (query: string) =>
        client
          .query<BandSerachQuery>({
            query: gql`
              query BandSerach($query: String!) {
                findBandPlaying(query: $query) {
                  name
                  id
                  eventId
                }
              }
            `,
            variables: {
              query,
            },
          })
          .then((d) => d.data.findBandPlaying),
      keyExtractor: (data) => data.id,
      matchStringExtractor: (data) => data.name.toLocaleLowerCase(),
    }),
    [client],
  );

  const [selected, setSelected] = useState(-1);
  const [focused, setFocused] = useState(false);
  const ref = useRef();

  const {data, loading, setQuery} = useTypeahead(config);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key == 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => {
          s--;
          if (s < 0 && data.length > 0) {
            s = data.length - 1;
          }
          return s;
        });
      } else if (e.key == 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => {
          s++;
          if (s >= data.length) {
            s = 0;
          }
          return s;
        });
      } else if (e.key == 'ArrowUp') {
        e.preventDefault();
      } else if (e.key == 'ArrowUp') {
        e.preventDefault();
      }
    },
    [],
  );

  useEffect(() => {
    const item = data[selected];
    if (item != null) {
      // ref.current.value =
    }
  }, [ref, selected]);

  console.log(loading);

  return (
    <Box
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      position="relative"
    >
      <Menu isOpen={data.length > 0 && focused} computePositionOnMount={true}>
        <Input
          ref={ref}
          placeholder="Bands suchen…"
          onChange={async (e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Stack position="absolute" bg="Background">
          {data.map((d, i) => (
            <MenuItem key={d.id}>
              {d.name} ({d.eventId.replace(/[^\d]/g, '')})
            </MenuItem>
          ))}
          {loading && <Spinner />}
        </Stack>
      </Menu>
    </Box>
  );
}
