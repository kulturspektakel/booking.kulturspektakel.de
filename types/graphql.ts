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

export type Asset = {
  copyright?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  uri: Scalars['String'];
};

export type BandApplication = Node & {
  __typename?: 'BandApplication';
  bandApplicationRating: Array<BandApplicationRating>;
  bandname: Scalars['String'];
  city: Scalars['String'];
  comments: BandApplicationCommentsConnection;
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  contactedByViewer?: Maybe<Viewer>;
  createdAt: Scalars['DateTime'];
  demo?: Maybe<Scalars['String']>;
  demoEmbed?: Maybe<Scalars['String']>;
  demoEmbedType?: Maybe<DemoEmbedType>;
  demoEmbedUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  event: Event;
  eventId: Scalars['ID'];
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
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  numberOfArtists?: Maybe<Scalars['Int']>;
  numberOfNonMaleArtists?: Maybe<Scalars['Int']>;
  pastApplications: Array<BandApplication>;
  pastPerformances: Array<BandPlaying>;
  rating?: Maybe<Scalars['Float']>;
  website?: Maybe<Scalars['String']>;
};

export type BandApplicationCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type BandApplicationComment = Node & {
  __typename?: 'BandApplicationComment';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user: Viewer;
};

export type BandApplicationCommentInput = {
  bandApplicationId: Scalars['ID'];
  comment: Scalars['String'];
};

export type BandApplicationCommentsConnection = {
  __typename?: 'BandApplicationCommentsConnection';
  edges: Array<BandApplicationCommentsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BandApplicationCommentsConnectionEdge = {
  __typename?: 'BandApplicationCommentsConnectionEdge';
  cursor: Scalars['String'];
  node: BandApplicationComment;
};

export type BandApplicationRating = {
  __typename?: 'BandApplicationRating';
  rating: Scalars['Int'];
  viewer: Viewer;
};

export type BandApplicationUpdateInput = {
  contacted?: InputMaybe<Scalars['Boolean']>;
  instagramFollower?: InputMaybe<Scalars['Int']>;
};

export type BandPlaying = Node & {
  __typename?: 'BandPlaying';
  area: Area;
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  event: Event;
  eventId: Scalars['ID'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  photo?: Maybe<PixelImage>;
  shortDescription?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
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
  demo?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
  genreCategory: GenreCategory;
  hasPreviouslyPlayed?: InputMaybe<PreviouslyPlayed>;
  heardAboutBookingFrom?: InputMaybe<HeardAboutBookingFrom>;
  instagram?: InputMaybe<Scalars['String']>;
  knowsKultFrom?: InputMaybe<Scalars['String']>;
  numberOfArtists?: InputMaybe<Scalars['Int']>;
  numberOfNonMaleArtists?: InputMaybe<Scalars['Int']>;
  website?: InputMaybe<Scalars['String']>;
};

export enum DemoEmbedType {
  BandcampAlbum = 'BandcampAlbum',
  BandcampTrack = 'BandcampTrack',
  SoundcloudUrl = 'SoundcloudUrl',
  SpotifyAlbum = 'SpotifyAlbum',
  SpotifyArtist = 'SpotifyArtist',
  SpotifyTrack = 'SpotifyTrack',
  Unresolvable = 'Unresolvable',
  YouTubePlaylist = 'YouTubePlaylist',
  YouTubeVideo = 'YouTubeVideo',
}

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
  bandsPlaying: EventBandsPlayingConnection;
  description?: Maybe<Scalars['String']>;
  djApplicationEnd?: Maybe<Scalars['DateTime']>;
  end: Scalars['DateTime'];
  id: Scalars['ID'];
  media: EventMediaConnection;
  name: Scalars['String'];
  poster?: Maybe<PixelImage>;
  start: Scalars['DateTime'];
};

export type EventBandsPlayingArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EventMediaArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type EventBandsPlayingConnection = {
  __typename?: 'EventBandsPlayingConnection';
  edges: Array<EventBandsPlayingConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EventBandsPlayingConnectionEdge = {
  __typename?: 'EventBandsPlayingConnectionEdge';
  cursor: Scalars['String'];
  node: BandPlaying;
};

export type EventMediaConnection = {
  __typename?: 'EventMediaConnection';
  edges: Array<EventMediaConnectionEdge>;
  pageInfo: PageInfo;
};

export type EventMediaConnectionEdge = {
  __typename?: 'EventMediaConnectionEdge';
  cursor: Scalars['String'];
  node: Asset;
};

export enum EventType {
  Kulturspektakel = 'Kulturspektakel',
  Locker = 'Locker',
  Other = 'Other',
}

export enum GenreCategory {
  BluesFunkJazzSoul = 'Blues_Funk_Jazz_Soul',
  Dj = 'DJ',
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
  createBandApplicationComment: BandApplication;
  createOrder: Order;
  deleteBandApplicationComment: BandApplication;
  markBandApplicationContacted: BandApplication;
  rateBandApplication: BandApplication;
  updateBandApplication: BandApplication;
  updateDeviceProductList: Device;
  upsertProductList: ProductList;
};

export type MutationCreateBandApplicationArgs = {
  data: CreateBandApplicationInput;
  eventId: Scalars['ID'];
};

export type MutationCreateBandApplicationCommentArgs = {
  input: BandApplicationCommentInput;
};

export type MutationCreateOrderArgs = {
  deposit: Scalars['Int'];
  deviceTime: Scalars['DateTime'];
  payment: OrderPayment;
  products: Array<OrderItemInput>;
};

export type MutationDeleteBandApplicationCommentArgs = {
  id: Scalars['ID'];
};

export type MutationMarkBandApplicationContactedArgs = {
  bandApplicationId: Scalars['ID'];
  contacted: Scalars['Boolean'];
};

export type MutationRateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  rating?: InputMaybe<Scalars['Int']>;
};

export type MutationUpdateBandApplicationArgs = {
  bandApplicationId: Scalars['ID'];
  data?: InputMaybe<BandApplicationUpdateInput>;
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

export type News = Node & {
  __typename?: 'News';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
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
  highlight?: Maybe<Scalars['String']>;
  page: NuclinoPage;
};

export type NuclinoUser = {
  __typename?: 'NuclinoUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type ObfuscatedBandApplication = {
  __typename?: 'ObfuscatedBandApplication';
  applicationTime: Scalars['DateTime'];
  obfuscatedEmail: Scalars['String'];
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PixelImage = Asset & {
  __typename?: 'PixelImage';
  copyright?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  id: Scalars['String'];
  scaledUri: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  uri: Scalars['String'];
  width: Scalars['Int'];
};

export type PixelImageScaledUriArgs = {
  height?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

export enum PreviouslyPlayed {
  No = 'No',
  OtherFormation = 'OtherFormation',
  Yes = 'Yes',
}

export type Product = Billable &
  Node & {
    __typename?: 'Product';
    additives: Array<ProductAdditives>;
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

export type ProductAdditives = {
  __typename?: 'ProductAdditives';
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type ProductInput = {
  additives: Array<Scalars['ID']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  requiresDeposit: Scalars['Boolean'];
};

export type ProductList = Billable &
  Node & {
    __typename?: 'ProductList';
    active: Scalars['Boolean'];
    description?: Maybe<Scalars['String']>;
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
  bandPlaying?: Maybe<BandPlaying>;
  cardStatus: CardStatus;
  checkDuplicateApplication?: Maybe<ObfuscatedBandApplication>;
  config: Config;
  devices: Array<Device>;
  distanceToKult?: Maybe<Scalars['Float']>;
  events: Array<Event>;
  findBandPlaying: Array<BandPlaying>;
  news: QueryNewsConnection;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  nuclinoPages: Array<NuclinoSearchResult>;
  productAdditives: Array<ProductAdditives>;
  productLists: Array<ProductList>;
  transactions: Transactions;
  viewer?: Maybe<Viewer>;
};

export type QueryBandPlayingArgs = {
  eventId: Scalars['ID'];
  slug: Scalars['String'];
};

export type QueryCardStatusArgs = {
  payload: Scalars['String'];
};

export type QueryCheckDuplicateApplicationArgs = {
  bandname: Scalars['String'];
  eventId: Scalars['ID'];
};

export type QueryDevicesArgs = {
  type?: InputMaybe<DeviceType>;
};

export type QueryDistanceToKultArgs = {
  origin: Scalars['String'];
};

export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<EventType>;
};

export type QueryFindBandPlayingArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};

export type QueryNewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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

export type QueryProductAdditivesArgs = {
  type?: InputMaybe<DeviceType>;
};

export type QueryProductListsArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']>;
};

export type QueryNewsConnection = {
  __typename?: 'QueryNewsConnection';
  edges: Array<QueryNewsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryNewsConnectionEdge = {
  __typename?: 'QueryNewsConnectionEdge';
  cursor: Scalars['String'];
  node: News;
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

export type EventQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type EventQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {
        __typename?: 'Event';
        name: string;
        start: Date;
        end: Date;
        bandApplicationStart?: Date | null;
        bandApplicationEnd?: Date | null;
        djApplicationEnd?: Date | null;
      }
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export const EventDocument = gql`
  query Event($id: ID!) {
    node(id: $id) {
      ... on Event {
        name
        start
        end
        bandApplicationStart
        bandApplicationEnd
        djApplicationEnd
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(
  baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>,
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
