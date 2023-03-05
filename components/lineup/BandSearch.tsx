import {gql, useApolloClient} from '@apollo/client';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner,
} from '@chakra-ui/react';
import React, {useMemo, useRef} from 'react';
import {useCombobox} from 'downshift';
import {BandSerachQuery} from '../../types/graphql';
import {TomoTypeaheadConfig, useTypeahead} from './TomoTypeahead';
import {Search2Icon} from '@chakra-ui/icons';

export default function BandSearch() {
  const client = useApolloClient();
  const minimumQueryLength = 2;
  const displaySetLimit = 10;

  const config: TomoTypeaheadConfig<
    BandSerachQuery['findBandPlaying'][number]
  > = useMemo(
    () => ({
      fetcher: (query: string) =>
        client
          .query<BandSerachQuery>({
            query: gql`
              query BandSerach($query: String!, $limit: Int!) {
                findBandPlaying(query: $query, limit: $limit) {
                  name
                  id
                  eventId
                }
              }
            `,
            variables: {
              query,
              limit: displaySetLimit,
            },
          })
          .then((d) => d.data.findBandPlaying),
      keyExtractor: (data) => data.id,
      matchStringExtractor: (data) => data.name.toLocaleLowerCase(),
      minimumQueryLength,
      displaySetLimit,
    }),
    [client],
  );

  const {data, loading, setQuery} = useTypeahead(config);
  const {
    getItemProps,
    isOpen,
    getInputProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
  } = useCombobox({
    items: data,
    onInputValueChange: (e) => setQuery(e.inputValue ?? ''),
  });

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <Box>
      <Popover
        isOpen={isOpen && inputValue.length >= minimumQueryLength}
        initialFocusRef={ref}
      >
        <PopoverAnchor>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              borderRadius="999em"
              placeholder="Bands suchen…"
              {...getInputProps({ref})}
            />
          </InputGroup>
        </PopoverAnchor>
        <PopoverContent>
          <List {...getMenuProps()}>
            {data.map((item, index) => (
              <ListItem
                p="2"
                key={item.id}
                {...getItemProps({item, index})}
                bg={highlightedIndex === index ? 'red' : ''}
                _hover={{bg: 'yellow'}}
              >
                {item.name} ({item.eventId.replace(/[^\d]/g, '')})
              </ListItem>
            ))}
            {inputValue.length >= minimumQueryLength &&
              data.length === 0 &&
              !loading && <Center p="2">Keine Band gefunden</Center>}
            {loading && (
              <Center p="2">
                <Spinner />
              </Center>
            )}
          </List>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
