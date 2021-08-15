import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Area = Node & {
  __typename?: 'Area';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  themeColor: Scalars['String'];
  table: Array<Table>;
  openingHour: Array<OpeningHour>;
  availableTables: Scalars['Int'];
  availability: Array<TableAvailability>;
  bandsPlaying: Array<Band>;
};

export type AreaOpeningHourArgs = {
  day?: Maybe<Scalars['Date']>;
};

export type AreaAvailableTablesArgs = {
  time?: Maybe<Scalars['DateTime']>;
};

export type AreaAvailabilityArgs = {
  partySize: Scalars['Int'];
  day: Scalars['Date'];
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type Band = {
  __typename?: 'Band';
  id: Scalars['ID'];
  name: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  id: Scalars['ID'];
  bandname: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
  genreCategory: GenreCategory;
  facebook?: Maybe<Scalars['String']>;
  facebookLikes?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  email: Scalars['String'];
  city: Scalars['String'];
  demo?: Maybe<Scalars['String']>;
};

export type Billable = {
  salesNumbers: SalesNumber;
};

export type BillableSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Config = {
  __typename?: 'Config';
  reservationStart: Scalars['DateTime'];
  tokenValue: Scalars['Int'];
  bandApplicationDeadline: Scalars['DateTime'];
};

export type CreateBandApplicationInput = {
  email: Scalars['String'];
  bandname: Scalars['String'];
  genreCategory: GenreCategory;
  genre?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  demo: Scalars['String'];
  description: Scalars['String'];
  numberOfArtists: Scalars['Int'];
  numberOfNonMaleArtists: Scalars['Int'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  knowsKultFrom?: Maybe<Scalars['String']>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
};

export type Device = Billable & {
  __typename?: 'Device';
  salesNumbers: SalesNumber;
  id: Scalars['ID'];
  productList?: Maybe<ProductList>;
  lastSeen?: Maybe<Scalars['DateTime']>;
};

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Event = Node & {
  __typename?: 'Event';
  /** Unique identifier for the resource */
  id: Scalars['ID'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  bandApplicationStart?: Maybe<Scalars['DateTime']>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']>;
  bandApplication: Array<BandApplication>;
};

export enum GenreCategory {
  Rock = 'Rock',
  Pop = 'Pop',
  Indie = 'Indie',
  ReggaeSka = 'Reggae_Ska',
  BluesFunkJazzSoul = 'Blues_Funk_Jazz_Soul',
  FolkSingerSongwriterCountry = 'Folk_SingerSongwriter_Country',
  ElektroHipHop = 'Elektro_HipHop',
  HardrockMetalPunk = 'Hardrock_Metal_Punk',
  Other = 'Other',
}

export enum HeardAboutBookingFrom {
  BYon = 'BYon',
  Newspaper = 'Newspaper',
  Friends = 'Friends',
  Website = 'Website',
  Facebook = 'Facebook',
}

export type HistoricalProduct = Billable & {
  __typename?: 'HistoricalProduct';
  salesNumbers: SalesNumber;
  name: Scalars['String'];
  productListId: Scalars['Int'];
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateReservationOtherPersons?: Maybe<Reservation>;
  cancelReservation?: Maybe<Scalars['Boolean']>;
  confirmReservation?: Maybe<Reservation>;
  requestReservation: Scalars['Boolean'];
  updateReservation?: Maybe<Reservation>;
  checkInReservation?: Maybe<Reservation>;
  createOrder?: Maybe<Order>;
  createReservation?: Maybe<Reservation>;
  upsertProductList?: Maybe<ProductList>;
  swapReservations?: Maybe<Scalars['Boolean']>;
  createBandApplication?: Maybe<BandApplication>;
};

export type MutationUpdateReservationOtherPersonsArgs = {
  token: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
};

export type MutationCancelReservationArgs = {
  token: Scalars['String'];
};

export type MutationConfirmReservationArgs = {
  token: Scalars['String'];
};

export type MutationRequestReservationArgs = {
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  areaId: Scalars['ID'];
  tableType?: Maybe<TableType>;
};

export type MutationUpdateReservationArgs = {
  id: Scalars['Int'];
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  tableId?: Maybe<Scalars['ID']>;
  checkedInPersons?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  primaryPerson?: Maybe<Scalars['String']>;
};

export type MutationCheckInReservationArgs = {
  id: Scalars['Int'];
  checkedInPersons: Scalars['Int'];
};

export type MutationCreateOrderArgs = {
  products: Array<OrderItemInput>;
  payment: OrderPayment;
  clientId?: Maybe<Scalars['String']>;
  deposit: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
};

export type MutationCreateReservationArgs = {
  tableId: Scalars['ID'];
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
};

export type MutationUpsertProductListArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  products?: Maybe<Array<ProductInput>>;
};

export type MutationSwapReservationsArgs = {
  a: Scalars['Int'];
  b: Scalars['Int'];
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
};

export type Node = {
  /** Unique identifier for the resource */
  id: Scalars['ID'];
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  payment: OrderPayment;
  tokens: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deviceTime: Scalars['DateTime'];
  deviceId: Scalars['String'];
  items: Array<OrderItem>;
  total?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  name: Scalars['String'];
  productList?: Maybe<ProductList>;
  perUnitPrice: Scalars['Int'];
};

export type OrderItemInput = {
  perUnitPrice: Scalars['Int'];
  name: Scalars['String'];
  amount: Scalars['Int'];
  productListId?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
};

export enum OrderPayment {
  Cash = 'CASH',
  Bon = 'BON',
  SumUp = 'SUM_UP',
  Voucher = 'VOUCHER',
  FreeCrew = 'FREE_CREW',
  FreeBand = 'FREE_BAND',
}

export type Product = Billable & {
  __typename?: 'Product';
  salesNumbers: SalesNumber;
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit: Scalars['Boolean'];
  productListId: Scalars['Int'];
};

export type ProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit?: Maybe<Scalars['Boolean']>;
};

export type ProductList = Billable & {
  __typename?: 'ProductList';
  salesNumbers: SalesNumber;
  id: Scalars['Int'];
  name: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  product: Array<Product>;
  historicalProducts: Array<HistoricalProduct>;
};

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  reservationForToken?: Maybe<Reservation>;
  viewer?: Maybe<Viewer>;
  node?: Maybe<Node>;
  productLists: Array<ProductList>;
  config?: Maybe<Config>;
  availableCapacity: Scalars['Int'];
  reservationsByPerson: Array<ReservationByPerson>;
  devices: Array<Device>;
  productList?: Maybe<ProductList>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
};

export type QueryReservationForTokenArgs = {
  token: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryAvailableCapacityArgs = {
  time?: Maybe<Scalars['DateTime']>;
};

export type QueryProductListArgs = {
  id: Scalars['Int'];
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['Int'];
  status: ReservationStatus;
  token: Scalars['String'];
  table: Table;
  tableId: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  primaryPerson: Scalars['String'];
  primaryEmail: Scalars['String'];
  otherPersons: Array<Scalars['String']>;
  checkedInPersons: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  checkInTime?: Maybe<Scalars['DateTime']>;
  swappableWith: Array<Maybe<Reservation>>;
  alternativeTables: Array<Maybe<Table>>;
  availableToCheckIn: Scalars['Int'];
  reservationsFromSamePerson: Array<Reservation>;
};

export type ReservationByPerson = {
  __typename?: 'ReservationByPerson';
  email: Scalars['String'];
  reservations: Array<Reservation>;
};

export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
}

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int'];
  total: Scalars['Float'];
  timeSeries: Array<TimeSeries>;
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: Maybe<TimeGrouping>;
};

export type Table = Node & {
  __typename?: 'Table';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  maxCapacity: Scalars['Int'];
  type: TableType;
  area: Area;
  reservations: Array<Reservation>;
};

export type TableReservationsArgs = {
  day?: Maybe<Scalars['Date']>;
};

export type TableAvailability = {
  __typename?: 'TableAvailability';
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  tableType: TableType;
};

export enum TableType {
  Table = 'TABLE',
  Island = 'ISLAND',
}

export enum TimeGrouping {
  Hour = 'Hour',
  Day = 'Day',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Viewer = {
  __typename?: 'Viewer';
  displayName: Scalars['String'];
  email: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type DistanceQueryVariables = Exact<{
  origin: Scalars['String'];
}>;

export type DistanceQuery = {
  __typename?: 'Query';
  distanceToKult?: Maybe<number>;
};

export type ThanksQueryVariables = Exact<{[key: string]: never}>;

export type ThanksQuery = {
  __typename?: 'Query';
  node?: Maybe<
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'Event'; bandApplicationEnd?: Maybe<Date>}
    | {__typename?: 'Table'}
  >;
};

export type EventQueryVariables = Exact<{[key: string]: never}>;

export type EventQuery = {
  __typename?: 'Query';
  node?: Maybe<
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {
        __typename?: 'Event';
        start: Date;
        end: Date;
        bandApplicationStart?: Maybe<Date>;
        bandApplicationEnd?: Maybe<Date>;
      }
    | {__typename?: 'Table'}
  >;
};

export type CreateBandApplicationMutationVariables = Exact<{
  data: CreateBandApplicationInput;
}>;

export type CreateBandApplicationMutation = {
  __typename?: 'Mutation';
  createBandApplication?: Maybe<{__typename?: 'BandApplication'; id: string}>;
};

export const DistanceDocument = gql`
  query Distance($origin: String!) {
    distanceToKult(origin: $origin)
  }
`;

/**
 * __useDistanceQuery__
 *
 * To run a query within a React component, call `useDistanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useDistanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDistanceQuery({
 *   variables: {
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useDistanceQuery(
  baseOptions: Apollo.QueryHookOptions<DistanceQuery, DistanceQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<DistanceQuery, DistanceQueryVariables>(
    DistanceDocument,
    options,
  );
}
export function useDistanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DistanceQuery,
    DistanceQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<DistanceQuery, DistanceQueryVariables>(
    DistanceDocument,
    options,
  );
}
export type DistanceQueryHookResult = ReturnType<typeof useDistanceQuery>;
export type DistanceLazyQueryHookResult = ReturnType<
  typeof useDistanceLazyQuery
>;
export type DistanceQueryResult = Apollo.QueryResult<
  DistanceQuery,
  DistanceQueryVariables
>;
export const ThanksDocument = gql`
  query Thanks {
    node(id: "Event:kult2022") {
      ... on Event {
        bandApplicationEnd
      }
    }
  }
`;

/**
 * __useThanksQuery__
 *
 * To run a query within a React component, call `useThanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useThanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useThanksQuery(
  baseOptions?: Apollo.QueryHookOptions<ThanksQuery, ThanksQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<ThanksQuery, ThanksQueryVariables>(
    ThanksDocument,
    options,
  );
}
export function useThanksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ThanksQuery, ThanksQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<ThanksQuery, ThanksQueryVariables>(
    ThanksDocument,
    options,
  );
}
export type ThanksQueryHookResult = ReturnType<typeof useThanksQuery>;
export type ThanksLazyQueryHookResult = ReturnType<typeof useThanksLazyQuery>;
export type ThanksQueryResult = Apollo.QueryResult<
  ThanksQuery,
  ThanksQueryVariables
>;
export const EventDocument = gql`
  query Event {
    node(id: "Event:kult2022") {
      ... on Event {
        start
        end
        bandApplicationStart
        bandApplicationEnd
      }
    }
  }
`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventQuery(
  baseOptions?: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<EventQuery, EventQueryVariables>(
    EventDocument,
    options,
  );
}
export function useEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(
    EventDocument,
    options,
  );
}
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<
  EventQuery,
  EventQueryVariables
>;
export const CreateBandApplicationDocument = gql`
  mutation CreateBandApplication($data: CreateBandApplicationInput!) {
    createBandApplication(data: $data) {
      id
    }
  }
`;
export type CreateBandApplicationMutationFn = Apollo.MutationFunction<
  CreateBandApplicationMutation,
  CreateBandApplicationMutationVariables
>;

/**
 * __useCreateBandApplicationMutation__
 *
 * To run a mutation, you first call `useCreateBandApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBandApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBandApplicationMutation, { data, loading, error }] = useCreateBandApplicationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBandApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBandApplicationMutation,
    CreateBandApplicationMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CreateBandApplicationMutation,
    CreateBandApplicationMutationVariables
  >(CreateBandApplicationDocument, options);
}
export type CreateBandApplicationMutationHookResult = ReturnType<
  typeof useCreateBandApplicationMutation
>;
export type CreateBandApplicationMutationResult =
  Apollo.MutationResult<CreateBandApplicationMutation>;
export type CreateBandApplicationMutationOptions = Apollo.BaseMutationOptions<
  CreateBandApplicationMutation,
  CreateBandApplicationMutationVariables
>;
