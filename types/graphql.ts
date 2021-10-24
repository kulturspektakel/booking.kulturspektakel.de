import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  availability: Array<TableAvailability>;
  availableTables: Scalars['Int'];
  bandsPlaying: Array<Band>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  openingHour: Array<OpeningHour>;
  table: Array<Table>;
  themeColor: Scalars['String'];
};

export type AreaAvailabilityArgs = {
  day: Scalars['Date'];
  partySize: Scalars['Int'];
};

export type AreaAvailableTablesArgs = {
  time?: Maybe<Scalars['DateTime']>;
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type AreaOpeningHourArgs = {
  day?: Maybe<Scalars['Date']>;
};

export type Band = {
  __typename?: 'Band';
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  bandApplicationRating: Array<BandApplicationRating>;
  bandname: Scalars['String'];
  city: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  contactedByViewer?: Maybe<Viewer>;
  demo?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  facebookLikes?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: Maybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
  id: Scalars['ID'];
  instagram?: Maybe<Scalars['String']>;
  instagramFollower?: Maybe<Scalars['Int']>;
  knowsKultFrom?: Maybe<Scalars['String']>;
  numberOfArtists?: Maybe<Scalars['Int']>;
  numberOfNonMaleArtists?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  rating: Scalars['Int'];
  viewer: Viewer;
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
  bandApplicationDeadline: Scalars['DateTime'];
  reservationStart: Scalars['DateTime'];
  tokenValue: Scalars['Int'];
};

export type CreateBandApplicationInput = {
  bandname: Scalars['String'];
  city: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  demo: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: Maybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: Maybe<HeardAboutBookingFrom>;
  instagram?: Maybe<Scalars['String']>;
  knowsKultFrom?: Maybe<Scalars['String']>;
  numberOfArtists: Scalars['Int'];
  numberOfNonMaleArtists: Scalars['Int'];
  website?: Maybe<Scalars['String']>;
};

export type Device = Billable & {
  __typename?: 'Device';
  id: Scalars['ID'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  productList?: Maybe<ProductList>;
  salesNumbers: SalesNumber;
};

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Event = Node & {
  __typename?: 'Event';
  bandApplication: Array<BandApplication>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']>;
  bandApplicationStart?: Maybe<Scalars['DateTime']>;
  end: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
};

export enum GenreCategory {
  BluesFunkJazzSoul = 'Blues_Funk_Jazz_Soul',
  ElektroHipHop = 'Elektro_HipHop',
  FolkSingerSongwriterCountry = 'Folk_SingerSongwriter_Country',
  HardrockMetalPunk = 'Hardrock_Metal_Punk',
  Indie = 'Indie',
  Other = 'Other',
  Pop = 'Pop',
  ReggaeSka = 'Reggae_Ska',
  Rock = 'Rock',
}

export enum HeardAboutBookingFrom {
  BYon = 'BYon',
  Facebook = 'Facebook',
  Friends = 'Friends',
  Instagram = 'Instagram',
  Newspaper = 'Newspaper',
  Website = 'Website',
}

export type HistoricalProduct = Billable & {
  __typename?: 'HistoricalProduct';
  name: Scalars['String'];
  productListId: Scalars['Int'];
  salesNumbers: SalesNumber;
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelReservation?: Maybe<Scalars['Boolean']>;
  checkInReservation?: Maybe<Reservation>;
  confirmReservation?: Maybe<Reservation>;
  createBandApplication?: Maybe<BandApplication>;
  createOrder?: Maybe<Order>;
  createReservation?: Maybe<Reservation>;
  markBandApplicationContacted?: Maybe<BandApplication>;
  rateBandApplication?: Maybe<BandApplication>;
  requestReservation: Scalars['Boolean'];
  swapReservations?: Maybe<Scalars['Boolean']>;
  updateReservation?: Maybe<Reservation>;
  updateReservationOtherPersons?: Maybe<Reservation>;
  upsertProductList?: Maybe<ProductList>;
};

export type MutationCancelReservationArgs = {
  token: Scalars['String'];
};

export type MutationCheckInReservationArgs = {
  checkedInPersons: Scalars['Int'];
  id: Scalars['Int'];
};

export type MutationConfirmReservationArgs = {
  token: Scalars['String'];
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
};

export type MutationCreateOrderArgs = {
  deposit: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
  payment: OrderPayment;
  products: Array<OrderItemInput>;
};

export type MutationCreateReservationArgs = {
  endTime: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
  otherPersons: Array<Scalars['String']>;
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  startTime: Scalars['DateTime'];
  tableId: Scalars['ID'];
};

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID'];
  contacted: Scalars['Boolean'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  rating?: Maybe<Scalars['Int']>;
};

export type MutationRequestReservationArgs = {
  areaId: Scalars['ID'];
  endTime: Scalars['DateTime'];
  otherPersons: Array<Scalars['String']>;
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  startTime: Scalars['DateTime'];
  tableType?: Maybe<TableType>;
};

export type MutationSwapReservationsArgs = {
  a: Scalars['Int'];
  b: Scalars['Int'];
};

export type MutationUpdateReservationArgs = {
  checkedInPersons?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  primaryPerson?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  tableId?: Maybe<Scalars['ID']>;
};

export type MutationUpdateReservationOtherPersonsArgs = {
  otherPersons: Array<Scalars['String']>;
  token: Scalars['String'];
};

export type MutationUpsertProductListArgs = {
  active?: Maybe<Scalars['Boolean']>;
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductInput>>;
};

export type Node = {
  /** Unique identifier for the resource */
  id: Scalars['ID'];
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  deposit: Scalars['Int'];
  deviceId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  items: Array<OrderItem>;
  payment: OrderPayment;
  total?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  perUnitPrice: Scalars['Int'];
  productList?: Maybe<ProductList>;
};

export type OrderItemInput = {
  amount: Scalars['Int'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  perUnitPrice: Scalars['Int'];
  productListId?: Maybe<Scalars['Int']>;
};

export enum OrderPayment {
  Bon = 'BON',
  Cash = 'CASH',
  FreeBand = 'FREE_BAND',
  FreeCrew = 'FREE_CREW',
  KultCard = 'KULT_CARD',
  SumUp = 'SUM_UP',
  Voucher = 'VOUCHER',
}

export enum PreviouslyPlayed {
  No = 'No',
  OtherFormation = 'OtherFormation',
  Yes = 'Yes',
}

export type Product = Billable & {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
  productListId: Scalars['Int'];
  requiresDeposit: Scalars['Boolean'];
  salesNumbers: SalesNumber;
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
  emoji?: Maybe<Scalars['String']>;
  historicalProducts: Array<HistoricalProduct>;
  id: Scalars['Int'];
  name: Scalars['String'];
  product: Array<Product>;
  salesNumbers: SalesNumber;
};

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  availableCapacity: Scalars['Int'];
  config?: Maybe<Config>;
  devices: Array<Device>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
  node?: Maybe<Node>;
  productList?: Maybe<ProductList>;
  productLists: Array<ProductList>;
  reservationForToken?: Maybe<Reservation>;
  reservationsByPerson: Array<ReservationByPerson>;
  viewer?: Maybe<Viewer>;
};

export type QueryAvailableCapacityArgs = {
  time?: Maybe<Scalars['DateTime']>;
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryProductListArgs = {
  id: Scalars['Int'];
};

export type QueryReservationForTokenArgs = {
  token: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  alternativeTables: Array<Maybe<Table>>;
  availableToCheckIn: Scalars['Int'];
  checkInTime?: Maybe<Scalars['DateTime']>;
  checkedInPersons: Scalars['Int'];
  endTime: Scalars['DateTime'];
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  otherPersons: Array<Scalars['String']>;
  primaryEmail: Scalars['String'];
  primaryPerson: Scalars['String'];
  reservationsFromSamePerson: Array<Reservation>;
  startTime: Scalars['DateTime'];
  status: ReservationStatus;
  swappableWith: Array<Maybe<Reservation>>;
  table: Table;
  tableId: Scalars['String'];
  token: Scalars['String'];
};

export type ReservationByPerson = {
  __typename?: 'ReservationByPerson';
  email: Scalars['String'];
  reservations: Array<Reservation>;
};

export enum ReservationStatus {
  CheckedIn = 'CheckedIn',
  Confirmed = 'Confirmed',
  Pending = 'Pending',
}

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int'];
  timeSeries: Array<TimeSeries>;
  total: Scalars['Float'];
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: Maybe<TimeGrouping>;
};

export type Table = Node & {
  __typename?: 'Table';
  area: Area;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  maxCapacity: Scalars['Int'];
  reservations: Array<Reservation>;
  type: TableType;
};

export type TableReservationsArgs = {
  day?: Maybe<Scalars['Date']>;
};

export type TableAvailability = {
  __typename?: 'TableAvailability';
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
  tableType: TableType;
};

export enum TableType {
  Island = 'ISLAND',
  Table = 'TABLE',
}

export enum TimeGrouping {
  Day = 'Day',
  Hour = 'Hour',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Viewer = Node & {
  __typename?: 'Viewer';
  displayName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type DistanceQueryVariables = Exact<{
  origin: Scalars['String'];
}>;

export type DistanceQuery = {
  __typename?: 'Query';
  distanceToKult?: number | null | undefined;
};

export type ThanksQueryVariables = Exact<{[key: string]: never}>;

export type ThanksQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'Event'; bandApplicationEnd?: Date | null | undefined}
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
    | null
    | undefined;
};

export type EventQueryVariables = Exact<{[key: string]: never}>;

export type EventQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {
        __typename?: 'Event';
        start: Date;
        end: Date;
        bandApplicationStart?: Date | null | undefined;
        bandApplicationEnd?: Date | null | undefined;
      }
    | {__typename?: 'Table'}
    | {__typename?: 'Viewer'}
    | null
    | undefined;
};

export type CreateBandApplicationMutationVariables = Exact<{
  data: CreateBandApplicationInput;
}>;

export type CreateBandApplicationMutation = {
  __typename?: 'Mutation';
  createBandApplication?:
    | {__typename?: 'BandApplication'; id: string}
    | null
    | undefined;
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
