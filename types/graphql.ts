import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  DateTime: Date;
};

export type Area = Node & {
  __typename?: 'Area';
  bandsPlaying: Array<BandPlaying>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  openingHour: Array<OpeningHour>;
  themeColor: Scalars['String'];
};

export type AreaBandsPlayingArgs = {
  day: Scalars['Date'];
};

export type AreaOpeningHourArgs = {
  day?: InputMaybe<Scalars['Date']>;
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
  website?: Maybe<Scalars['String']>;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  rating: Scalars['Int'];
  viewer: Viewer;
};

export type BandPlaying = Node & {
  __typename?: 'BandPlaying';
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type Billable = {
  salesNumbers: Array<SalesNumber>;
};

export type BillableSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Board = {
  __typename?: 'Board';
  chair: Scalars['String'];
  deputy: Scalars['String'];
  deputy2: Scalars['String'];
  observer: Scalars['String'];
  observer2: Scalars['String'];
  secretary: Scalars['String'];
  treasurer: Scalars['String'];
};

export type Card = Node &
  Transactionable & {
    __typename?: 'Card';
    id: Scalars['ID'];
    transactions: CardTransactionConnection;
  };

export type CardTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
};

export type CardStatus = {
  __typename?: 'CardStatus';
  balance: Scalars['Int'];
  cardId: Scalars['ID'];
  deposit: Scalars['Int'];
  hasNewerTransactions?: Maybe<Scalars['Boolean']>;
  recentTransactions?: Maybe<Array<Transaction>>;
};

export type CardTransaction = Transaction & {
  __typename?: 'CardTransaction';
  Order: Array<Order>;
  balanceAfter: Scalars['Int'];
  balanceBefore: Scalars['Int'];
  cardId: Scalars['String'];
  clientId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  depositAfter: Scalars['Int'];
  depositBefore: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
  transactionType: CardTransactionType;
};

export type CardTransactionConnection = {
  __typename?: 'CardTransactionConnection';
  /** This includes money made from deposit */
  balanceTotal: Scalars['Int'];
  data: Array<CardTransaction>;
  depositIn: Scalars['Int'];
  depositOut: Scalars['Int'];
  totalCount: Scalars['Int'];
  uniqueCards: Scalars['Int'];
};

export enum CardTransactionType {
  Cashout = 'Cashout',
  Charge = 'Charge',
  TopUp = 'TopUp',
}

export type Config = {
  __typename?: 'Config';
  board: Board;
  depositValue: Scalars['Int'];
};

export type CreateBandApplicationInput = {
  bandname: Scalars['String'];
  city: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  demo: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: InputMaybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: InputMaybe<HeardAboutBookingFrom>;
  instagram?: InputMaybe<Scalars['String']>;
  knowsKultFrom?: InputMaybe<Scalars['String']>;
  numberOfArtists: Scalars['Int'];
  numberOfNonMaleArtists: Scalars['Int'];
  website?: InputMaybe<Scalars['String']>;
};

export type Device = Billable &
  Node &
  Transactionable & {
    __typename?: 'Device';
    id: Scalars['ID'];
    lastSeen?: Maybe<Scalars['DateTime']>;
    productList?: Maybe<ProductList>;
    salesNumbers: Array<SalesNumber>;
    softwareVersion?: Maybe<Scalars['String']>;
    transactions: CardTransactionConnection;
  };

export type DeviceSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type DeviceTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
};

export enum DeviceType {
  ContactlessTerminal = 'CONTACTLESS_TERMINAL',
  Ipad = 'IPAD',
}

export type Event = Node & {
  __typename?: 'Event';
  bandApplication: Array<BandApplication>;
  bandApplicationEnd?: Maybe<Scalars['DateTime']>;
  bandApplicationStart?: Maybe<Scalars['DateTime']>;
  bandsPlaying: Array<BandPlaying>;
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
  productListId: Scalars['ID'];
  salesNumbers: Array<SalesNumber>;
};

export type HistoricalProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type MissingTransaction = Transaction & {
  __typename?: 'MissingTransaction';
  balanceAfter: Scalars['Int'];
  balanceBefore: Scalars['Int'];
  depositAfter: Scalars['Int'];
  depositBefore: Scalars['Int'];
  numberOfMissingTransactions: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBandApplication: BandApplication;
  createOrder: Order;
  markBandApplicationContacted: BandApplication;
  rateBandApplication: BandApplication;
  updateDeviceProductList: Device;
  upsertProductList: ProductList;
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

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID'];
  contacted: Scalars['Boolean'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  rating?: InputMaybe<Scalars['Int']>;
};

export type MutationUpdateDeviceProductListArgs = {
  deviceId: Scalars['ID'];
  productListId: Scalars['ID'];
};

export type MutationUpsertProductListArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<ProductInput>>;
};

export type Node = {
  id: Scalars['ID'];
};

export type NuclinoPage = Node & {
  __typename?: 'NuclinoPage';
  content: Scalars['String'];
  id: Scalars['ID'];
  lastUpdatedAt: Scalars['DateTime'];
  lastUpdatedUser: NuclinoUser;
  title: Scalars['String'];
};

export type NuclinoSearchResult = {
  __typename?: 'NuclinoSearchResult';
  highlight: Scalars['String'];
  page: NuclinoPage;
};

export type NuclinoUser = {
  __typename?: 'NuclinoUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
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
  deviceId?: Maybe<Scalars['ID']>;
  id: Scalars['Int'];
  items: Array<OrderItem>;
  payment: OrderPayment;
  total: Scalars['Int'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  amount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  perUnitPrice: Scalars['Int'];
  productList?: Maybe<ProductList>;
};

export type OrderItemInput = {
  amount: Scalars['Int'];
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  perUnitPrice: Scalars['Int'];
  productListId?: InputMaybe<Scalars['Int']>;
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

export type Product = Billable &
  Node & {
    __typename?: 'Product';
    id: Scalars['ID'];
    name: Scalars['String'];
    price: Scalars['Int'];
    productListId: Scalars['ID'];
    requiresDeposit: Scalars['Boolean'];
    salesNumbers: Array<SalesNumber>;
  };

export type ProductSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit?: InputMaybe<Scalars['Boolean']>;
};

export type ProductList = Billable &
  Node & {
    __typename?: 'ProductList';
    active: Scalars['Boolean'];
    emoji?: Maybe<Scalars['String']>;
    historicalProducts: Array<HistoricalProduct>;
    id: Scalars['ID'];
    name: Scalars['String'];
    product: Array<Product>;
    salesNumbers: Array<SalesNumber>;
  };

export type ProductListSalesNumbersArgs = {
  after: Scalars['DateTime'];
  before: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  cardStatus: CardStatus;
  config: Config;
  devices: Array<Device>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  nuclinoPages: Array<NuclinoSearchResult>;
  productLists: Array<ProductList>;
  transactions: Transactions;
  viewer?: Maybe<Viewer>;
};

export type QueryCardStatusArgs = {
  payload: Scalars['String'];
};

export type QueryDevicesArgs = {
  type?: InputMaybe<DeviceType>;
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type QueryNuclinoPagesArgs = {
  query: Scalars['String'];
};

export type SalesNumber = {
  __typename?: 'SalesNumber';
  count: Scalars['Int'];
  payment: OrderPayment;
  timeSeries: Array<TimeSeries>;
  total: Scalars['Float'];
};

export type SalesNumberTimeSeriesArgs = {
  grouping?: InputMaybe<TimeGrouping>;
};

export enum TimeGrouping {
  Day = 'Day',
  Hour = 'Hour',
}

export type TimeSeries = {
  __typename?: 'TimeSeries';
  time: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Transaction = {
  balanceAfter: Scalars['Int'];
  balanceBefore: Scalars['Int'];
  depositAfter: Scalars['Int'];
  depositBefore: Scalars['Int'];
};

export type Transactionable = {
  transactions: CardTransactionConnection;
};

export type TransactionableTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
};

export type Transactions = Transactionable & {
  __typename?: 'Transactions';
  transactions: CardTransactionConnection;
};

export type TransactionsTransactionsArgs = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CardTransactionType>;
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
  distanceToKult?: number | null;
};

export type ThanksQueryVariables = Exact<{[key: string]: never}>;

export type ThanksQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {__typename?: 'Event'; bandApplicationEnd?: Date | null}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type EventQueryVariables = Exact<{[key: string]: never}>;

export type EventQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {
        __typename?: 'Event';
        start: Date;
        end: Date;
        bandApplicationStart?: Date | null;
        bandApplicationEnd?: Date | null;
      }
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type CreateBandApplicationMutationVariables = Exact<{
  data: CreateBandApplicationInput;
}>;

export type CreateBandApplicationMutation = {
  __typename?: 'Mutation';
  createBandApplication: {__typename?: 'BandApplication'; id: string};
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
    node(id: "Event:kult2023") {
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
