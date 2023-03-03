import {gql, useApolloClient} from '@apollo/client';
import {Input} from '@chakra-ui/react';
import React, {useEffect, useMemo, useState} from 'react';
import {BandSerachQuery} from '../../types/graphql';

class Typeahead<T> extends EventTarget {
  private requests: Map<string, Promise<void>> = new Map();
  private displaySets: Map<string, Map<string, T>> = new Map();
  private currentQuery = '';

  private fetcher: (query: string) => Promise<T[]>;
  private keyExtractor: (data: T) => string = (data) => data.id;
  private matchStringExtractor: (data: T) => string = (data) => data.name;
  private debounce: number;
  private displaySetLimit = 5;

  constructor(fetcher: (query: string) => Promise<T[]>, debounce?: number) {
    super();
    this.fetcher = fetcher;
    this.debounce = debounce ?? 150;
  }

  private matchesQuery(item: T, query: string): boolean {
    const matchString = this.matchStringExtractor(item).toLocaleLowerCase();
    return (
      matchString.startsWith(query) || matchString.indexOf(` ${query}`) > -1
    );
  }

  setQuery(q: string) {
    const query = q.toLocaleLowerCase();

    if (!query) {
      this.displaySets.clear();
      this.dispatchEvent(new CustomEvent<boolean>('loading', {detail: false}));
      this.dispatchEvent(
        new CustomEvent<T[]>('displaySetUpdated', {
          detail: [],
        }),
      );
      return;
    }

    if (this.displaySets.has(query)) {
      this.dispatchEvent(new CustomEvent<boolean>('loading', {detail: false}));
      this.dispatchEvent(
        new CustomEvent<T[]>('displaySetUpdated', {
          detail: Array.from(this.displaySets.get(query)?.values() ?? []),
        }),
      );
      return;
    }

    // we don't have an existing display set, create a new one
    const displaySet = new Map();

    // maybe we can prefill it from a previous display set
    const longestCommonDisplaySetKey = Array.from(this.displaySets.keys())
      .filter((key) => query.startsWith(key))
      .sort((a, b) => a.length - b.length)
      .pop();

    if (longestCommonDisplaySetKey != null) {
      // append all results from previous display set that still match
      const matchesFromPreviousSet = Array.from(
        this.displaySets.get(longestCommonDisplaySetKey)?.values() ?? [],
      ).filter((item) => this.matchesQuery(item, query));
      this.appendToDisplaySet(displaySet, matchesFromPreviousSet);
    }

    this.displaySets.set(query, displaySet);
    this.currentQuery = query;

    // STEP 2: NETWORK
    if (this.requests.has(query) || displaySet.size >= this.displaySetLimit) {
      this.dispatchEvent(new CustomEvent<boolean>('loading', {detail: false}));
      // query is already fetched or we have enough results we can bail early
      return;
    }

    const req = async () => {
      await new Promise((r) => setTimeout(r, this.debounce));
      if (this.currentQuery !== query) {
        // query has changed before debounce time elapsed, do nothing
        return;
      }

      // send request to server
      const data = await this.fetcher(query);
      // artifically slow down network requests
      await new Promise((r) => setTimeout(r, 2000));

      if (this.currentQuery !== query && this.displaySets.has(query)) {
        // query has changed, be we already made the request, so let's add it to the display set
        // do not trigger an update, because it's not the current display set
        this.appendToDisplaySet(this.displaySets.get(query)!, data, false);
        return;
      }

      this.dispatchEvent(new CustomEvent<boolean>('loading', {detail: false}));
      this.appendToDisplaySet(displaySet, data);
    };

    this.requests.set(
      query,
      req().then(() => {
        this.requests.delete(query);
      }),
    );
  }

  appendToDisplaySet(
    displaySet: Map<string, T>,
    data: T[],
    triggerUpdate?: false,
  ) {
    for (const item of data) {
      const key = this.keyExtractor(item);
      if (!displaySet.has(key)) {
        displaySet.set(key, item);
      }
    }

    if (triggerUpdate !== false) {
      this.dispatchEvent(
        new CustomEvent<T[]>('displaySetUpdated', {
          detail: Array.from(displaySet.values()),
        }),
      );
    }
  }
}

function useTypeahead<T>(fetcher: (query: string) => Promise<T[]>): {
  loading: boolean;
  data: T[];
  setQuery: (q: string) => void;
} {
  const ta = useMemo(() => new Typeahead(fetcher), [fetcher]);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cb1 = (e: Event) => setLoading((e as CustomEvent<boolean>).detail);
    ta.addEventListener('loading', cb1);

    const cb2 = (e: Event) => setData((e as CustomEvent<T[]>).detail);
    ta.addEventListener('displaySetUpdated', cb2);

    return () => {
      ta.removeEventListener('loading', cb1);
      ta.removeEventListener('displaySetUpdated', cb2);
    };
  }, [ta]);

  return {
    loading,
    data,
    setQuery: (q) => ta.setQuery(q),
  };
}

export default function BandSearch() {
  const client = useApolloClient();
  const fetcher = useMemo(
    () => (query: string) =>
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
    [client],
  );

  const {data, loading, setQuery} = useTypeahead(fetcher);

  return (
    <>
      <Input
        placeholder="Bands suchen…"
        onChange={async (e) => setQuery(e.target.value)}
      />
      <ol>
        {data.map((d) => (
          <li key={d.id}>
            {d.name} ({d.eventId.replace(/[^\d]/g, '')})
          </li>
        ))}
      </ol>
    </>
  );
}
