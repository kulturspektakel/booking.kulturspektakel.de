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
import {BandSerachDocument, BandSerachQuery} from '../../types/graphql';
import {TomoTypeaheadConfig, useTypeahead} from './TomoTypeahead';
import {Search2Icon} from '@chakra-ui/icons';
import {yearFromEventId} from './LineupTable';

gql`
  query BandSerach($query: String!, $limit: Int!) {
    findBandPlaying(query: $query, limit: $limit) {
      name
      id
      event {
        id
      }
    }
  }
`;

type BS = BandSerachQuery['findBandPlaying'][number];
export default function BandSearch(props: {
  onSelect: (value: BS | undefined) => void;
}) {
  const client = useApolloClient();
  const minimumQueryLength = 2;
  const displaySetLimit = 10;

  const config: TomoTypeaheadConfig<BS> = useMemo(
    () => ({
      fetcher: (query: string) =>
        client
          .query<BandSerachQuery>({
            query: BandSerachDocument,
            variables: {
              query,
              limit: displaySetLimit,
            },
          })
          .then((d) => {
            if (d.data == null) {
              throw new Error(`GraphQL error: ${d.errors?.[0].message}`);
            }
            return d.data.findBandPlaying;
          }),
      keyExtractor: (data) => data.id,
      matchStringExtractor: (data) => data.name.toLocaleLowerCase(),
      minimumQueryLength,
      displaySetLimit,
    }),
    [client],
  );

  const {data, loading, setQuery} = useTypeahead(config);
  const ref = useRef<HTMLInputElement | null>(null);

  const {
    getItemProps,
    isOpen,
    getInputProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
  } = useCombobox({
    id: 'band-search',
    items: data,
    onSelectedItemChange: (item) =>
      props.onSelect(item.selectedItem ?? undefined),
    onInputValueChange: (e) => setQuery(e.inputValue ?? ''),
    itemToString: (node) => node?.name ?? '',
    stateReducer: (state, {type, changes}) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          ref.current?.blur();

          return {
            ...changes,
            inputValue: '',
          };
        default:
          return changes;
      }
    },
  });

  return (
    <Box>
      <Popover
        isOpen={isOpen && inputValue.length >= minimumQueryLength}
        initialFocusRef={ref}
        placement="bottom-start"
      >
        <PopoverAnchor>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              borderRadius="full"
              placeholder="Bands suchen…"
              {...getInputProps({ref})}
            />
          </InputGroup>
        </PopoverAnchor>
        <PopoverContent overflow="hidden">
          <List {...getMenuProps()}>
            {data.map((item, index) => (
              <ListItem
                p="2"
                key={item.id}
                {...getItemProps({item, index})}
                bg={highlightedIndex === index ? 'Highlight' : ''}
                _hover={{bg: 'Highlight'}}
              >
                {item.name} ({yearFromEventId(item.event.id)})
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
