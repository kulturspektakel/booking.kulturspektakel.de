import {useMemo, useState, useEffect} from 'react';

class TomoTypeaheadLoadingStateChangeEvent extends Event {
  static readonly eventType = 'tomo-typeahead-loading';
  readonly loading: boolean;

  constructor(loading: boolean) {
    super(TomoTypeaheadLoadingStateChangeEvent.eventType);
    this.loading = loading;
  }
}

class TomoTypeaheadDisplaySetUpdateEvent<T> extends Event {
  static readonly eventType = 'tomo-typeahead-display-set-update';
  readonly data: T[];

  constructor(data: T[]) {
    super(TomoTypeaheadDisplaySetUpdateEvent.eventType);
    this.data = data;
  }
}

export type TomoTypeaheadConfig<T> = {
  fetcher: (query: string) => Promise<T[]>;
  keyExtractor: (data: T) => string;
  matchStringExtractor: (data: T) => string;
  debounce?: number;
  displaySetLimit?: number;
  minimumQueryLength?: number;
};

class TomoTypeahead<T> extends EventTarget {
  private requests: Map<string, Promise<void> | T[]> = new Map();
  private displaySets: Map<string, Map<string, T>> = new Map();
  private currentQuery = '';

  private fetcher: (query: string) => Promise<T[]>;
  private keyExtractor: (data: T) => string;
  private matchStringExtractor: (data: T) => string;
  private debounce = 150;
  private displaySetLimit = 5;
  private minimumQueryLength = 2;

  constructor(config: TomoTypeaheadConfig<T>) {
    super();
    this.fetcher = config.fetcher;
    this.keyExtractor = config.keyExtractor;
    this.matchStringExtractor = config.matchStringExtractor;
    this.debounce = config.debounce ?? this.debounce;
    this.displaySetLimit = config.displaySetLimit ?? this.displaySetLimit;
    this.minimumQueryLength =
      config.minimumQueryLength ?? this.minimumQueryLength;
  }

  private matchesQuery(item: T, query: string): boolean {
    const matchString = this.matchStringExtractor(item).toLocaleLowerCase();
    return (
      matchString.startsWith(query) || matchString.indexOf(` ${query}`) > -1
    );
  }

  longestCommonPrefix<T>(query: string, map: Map<string, T>) {
    const key = Array.from(map.keys())
      .filter((key) => query.startsWith(key))
      .sort((a, b) => a.length - b.length)
      .pop();

    if (key != null) {
      return map.get(key);
    }
  }

  setQuery(q: string) {
    const query = q.toLocaleLowerCase();

    if (!query) {
      this.displaySets.clear();
      this.requests.clear();
      this.dispatchEvent(new TomoTypeaheadLoadingStateChangeEvent(false));
      this.dispatchEvent(new TomoTypeaheadDisplaySetUpdateEvent<T>([]));
      return;
    }

    let displaySet: Map<string, T>;

    if (this.displaySets.has(query)) {
      // we have a display set, but maybe the we haven't done a network request
      displaySet = this.displaySets.get(query) ?? new Map();

      this.dispatchEvent(
        new TomoTypeaheadDisplaySetUpdateEvent(
          Array.from(displaySet.values() ?? []),
        ),
      );
    } else {
      // we don't have an existing display set, create a new one
      displaySet = new Map();

      const longestCommonPrefixDisplaySet = this.longestCommonPrefix(
        query,
        this.displaySets,
      );

      // maybe we can prefill it from a previous display set
      if (longestCommonPrefixDisplaySet != null) {
        // append all results from previous display set that still match
        const matchesFromPreviousSet = Array.from(
          longestCommonPrefixDisplaySet?.values() ?? [],
        ).filter((item) => this.matchesQuery(item, query));
        this.appendToDisplaySet(displaySet, matchesFromPreviousSet);
      }
    }

    this.currentQuery = query;
    this.displaySets.set(query, displaySet);

    const longestCommonPrefixRequest = this.longestCommonPrefix(
      query,
      this.requests,
    );

    // STEP 2: NETWORK
    if (
      query.length < this.minimumQueryLength ||
      // request is already in flight
      this.requests.has(query) ||
      // we already have enough local results
      displaySet.size >= this.displaySetLimit ||
      // LCP request already entirely included, nothing more to fetch
      (Array.isArray(longestCommonPrefixRequest) &&
        longestCommonPrefixRequest.every((r) =>
          displaySet.has(this.keyExtractor(r)),
        ))
    ) {
      this.dispatchEvent(new TomoTypeaheadLoadingStateChangeEvent(false));
      // query is already fetched or we have enough results we can bail early
      return;
    }

    const req = async () => {
      this.dispatchEvent(new TomoTypeaheadLoadingStateChangeEvent(true));
      await new Promise((r) => setTimeout(r, this.debounce));

      if (this.currentQuery !== query) {
        // query has changed before debounce time elapsed, do nothing
        return;
      }

      // send request to server
      const data = await this.fetcher(query);

      // artifically slow down network requests for debugging
      // await new Promise((r) => setTimeout(r, 2000));

      if (this.currentQuery !== query) {
        // query has changed, be we already made the request, so let's add it to the display set
        // do not trigger an update, because it's not the current display set
        this.appendToDisplaySet(displaySet, data, false);
      } else {
        this.dispatchEvent(new TomoTypeaheadLoadingStateChangeEvent(false));
        this.appendToDisplaySet(displaySet, data);
      }

      return data;
    };

    this.requests.set(
      query,
      req()
        .then((data) => {
          if (data != null) {
            this.requests.set(query, data);
          } else {
            this.requests.delete(query);
          }
        })
        .catch(() => {
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
        new TomoTypeaheadDisplaySetUpdateEvent<T>(
          Array.from(displaySet.values()),
        ),
      );
    }
  }
}

export function useTypeahead<T>(config: TomoTypeaheadConfig<T>): {
  loading: boolean;
  data: T[];
  setQuery: (q: string) => void;
} {
  const ta = useMemo(() => new TomoTypeahead(config), [config]);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadingListener = (e: Event) => {
      if (!(e instanceof TomoTypeaheadLoadingStateChangeEvent)) {
        return;
      }
      setLoading(e.loading);
    };

    const dataListener = (e: Event) => {
      if (!(e instanceof TomoTypeaheadDisplaySetUpdateEvent)) {
        return;
      }
      setData(e.data);
    };

    ta.addEventListener(
      TomoTypeaheadLoadingStateChangeEvent.eventType,
      loadingListener,
    );

    ta.addEventListener(
      TomoTypeaheadDisplaySetUpdateEvent.eventType,
      dataListener,
    );

    return () => {
      ta.removeEventListener(
        TomoTypeaheadLoadingStateChangeEvent.eventType,
        loadingListener,
      );
      ta.removeEventListener(
        TomoTypeaheadDisplaySetUpdateEvent.eventType,
        dataListener,
      );
    };
  }, [ta]);

  return {
    loading,
    data,
    setQuery: (q) => ta.setQuery(q),
  };
}
