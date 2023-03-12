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
  slug: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type BandPlayingPhotoArgs = {
  height?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
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

export type EventPosterArgs = {
  height?: InputMaybe<Scalars['Int']>;
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
  format: PixelImageFormat;
  height: Scalars['Int'];
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  uri: Scalars['String'];
  width: Scalars['Int'];
};

export enum PixelImageFormat {
  Jpeg = 'JPEG',
  Png = 'PNG',
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
  productLists: Array<ProductList>;
  transactions: Transactions;
  viewer?: Maybe<Viewer>;
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

export type DistanceQueryVariables = Exact<{
  origin: Scalars['String'];
}>;

export type DistanceQuery = {
  __typename?: 'Query';
  distanceToKult?: number | null;
};

export type DuplicateApplicationWarningQueryVariables = Exact<{
  bandname: Scalars['String'];
  eventId: Scalars['ID'];
}>;

export type DuplicateApplicationWarningQuery = {
  __typename?: 'Query';
  checkDuplicateApplication?: {
    __typename?: 'ObfuscatedBandApplication';
    applicationTime: Date;
    obfuscatedEmail: string;
  } | null;
};

export type EventDetailsFragment = {
  __typename?: 'Event';
  name: string;
  start: Date;
  end: Date;
  description?: string | null;
};

export type AreaPillFragment = {
  __typename?: 'Area';
  id: string;
  displayName: string;
  themeColor: string;
};

export type BandBoxFragment = {
  __typename?: 'BandPlaying';
  id: string;
  genre?: string | null;
  name: string;
  startTime: Date;
  photo?: {__typename?: 'PixelImage'; uri: string} | null;
  area: {
    __typename?: 'Area';
    id: string;
    displayName: string;
    themeColor: string;
  };
};

export type BandSerachQueryVariables = Exact<{
  query: Scalars['String'];
  limit: Scalars['Int'];
}>;

export type BandSerachQuery = {
  __typename?: 'Query';
  findBandPlaying: Array<{
    __typename?: 'BandPlaying';
    name: string;
    id: string;
    eventId: string;
  }>;
};

export type LineupTableQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type LineupTableQuery = {
  __typename?: 'Query';
  areas: Array<{
    __typename?: 'Area';
    id: string;
    displayName: string;
    themeColor: string;
  }>;
  event?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {
        __typename?: 'Event';
        id: string;
        name: string;
        start: Date;
        end: Date;
        bandsPlaying: {
          __typename?: 'EventBandsPlayingConnection';
          edges: Array<{
            __typename?: 'EventBandsPlayingConnectionEdge';
            node: {
              __typename?: 'BandPlaying';
              id: string;
              slug: string;
              genre?: string | null;
              name: string;
              startTime: Date;
              photo?: {__typename?: 'PixelImage'; uri: string} | null;
              area: {
                __typename?: 'Area';
                id: string;
                displayName: string;
                themeColor: string;
              };
            };
          }>;
        };
      }
    | {__typename?: 'News'}
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type YearSelectorQueryVariables = Exact<{[key: string]: never}>;

export type YearSelectorQuery = {
  __typename?: 'Query';
  events: Array<{
    __typename?: 'Event';
    id: string;
    start: Date;
    bandsPlaying: {
      __typename?: 'EventBandsPlayingConnection';
      totalCount: number;
    };
  }>;
};

export type ArticleFragment = {
  __typename?: 'News';
  slug: string;
  title: string;
  createdAt: Date;
  content: string;
};

export type ThanksQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ThanksQuery = {
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

export type CreateBandApplicationMutationVariables = Exact<{
  data: CreateBandApplicationInput;
}>;

export type CreateBandApplicationMutation = {
  __typename?: 'Mutation';
  createBandApplication: {__typename?: 'BandApplication'; id: string};
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

export type EventsQueryVariables = Exact<{[key: string]: never}>;

export type EventsQuery = {
  __typename?: 'Query';
  events: Array<{
    __typename?: 'Event';
    id: string;
    name: string;
    start: Date;
    end: Date;
    description?: string | null;
  }>;
};

export type NewsQueryVariables = Exact<{[key: string]: never}>;

export type NewsQuery = {
  __typename?: 'Query';
  news: {
    __typename?: 'QueryNewsConnection';
    edges: Array<{
      __typename?: 'QueryNewsConnectionEdge';
      node: {
        __typename?: 'News';
        slug: string;
        title: string;
        createdAt: Date;
        content: string;
      };
    }>;
  };
};

export type LineUpStaticPathsQueryVariables = Exact<{[key: string]: never}>;

export type LineUpStaticPathsQuery = {
  __typename?: 'Query';
  events: Array<{__typename?: 'Event'; id: string; start: Date}>;
};

export type LineupRedirectQueryVariables = Exact<{[key: string]: never}>;

export type LineupRedirectQuery = {
  __typename?: 'Query';
  events: Array<{
    __typename?: 'Event';
    id: string;
    bandsPlaying: {
      __typename?: 'EventBandsPlayingConnection';
      totalCount: number;
    };
  }>;
};

export type NewsSingleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type NewsSingleQuery = {
  __typename?: 'Query';
  node?:
    | {__typename?: 'Area'}
    | {__typename?: 'BandApplication'}
    | {__typename?: 'BandApplicationComment'}
    | {__typename?: 'BandPlaying'}
    | {__typename?: 'Card'}
    | {__typename?: 'Device'}
    | {__typename?: 'Event'}
    | {
        __typename?: 'News';
        slug: string;
        title: string;
        createdAt: Date;
        content: string;
      }
    | {__typename?: 'NuclinoPage'}
    | {__typename?: 'Product'}
    | {__typename?: 'ProductList'}
    | {__typename?: 'Viewer'}
    | null;
};

export type NewsArchiveQueryVariables = Exact<{[key: string]: never}>;

export type NewsArchiveQuery = {
  __typename?: 'Query';
  news: {
    __typename?: 'QueryNewsConnection';
    edges: Array<{
      __typename?: 'QueryNewsConnectionEdge';
      node: {__typename?: 'News'; title: string; createdAt: Date; slug: string};
    }>;
  };
};

export type PostersQueryVariables = Exact<{[key: string]: never}>;

export type PostersQuery = {
  __typename?: 'Query';
  events: Array<{
    __typename?: 'Event';
    id: string;
    start: Date;
    end: Date;
    poster?: {
      __typename?: 'PixelImage';
      uri: string;
      copyright?: string | null;
      title?: string | null;
    } | null;
  }>;
};

export const EventDetailsFragmentDoc = gql`
  fragment EventDetails on Event {
    name
    start
    end
    description
  }
`;
export const AreaPillFragmentDoc = gql`
  fragment AreaPill on Area {
    id
    displayName
    themeColor
  }
`;
export const BandBoxFragmentDoc = gql`
  fragment BandBox on BandPlaying {
    id
    genre
    name
    startTime
    photo {
      uri
    }
    area {
      id
      displayName
      themeColor
    }
  }
`;
export const ArticleFragmentDoc = gql`
  fragment Article on News {
    slug
    title
    createdAt
    content
  }
`;
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
export const DuplicateApplicationWarningDocument = gql`
  query DuplicateApplicationWarning($bandname: String!, $eventId: ID!) {
    checkDuplicateApplication(bandname: $bandname, eventId: $eventId) {
      applicationTime
      obfuscatedEmail
    }
  }
`;

/**
 * __useDuplicateApplicationWarningQuery__
 *
 * To run a query within a React component, call `useDuplicateApplicationWarningQuery` and pass it any options that fit your needs.
 * When your component renders, `useDuplicateApplicationWarningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDuplicateApplicationWarningQuery({
 *   variables: {
 *      bandname: // value for 'bandname'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDuplicateApplicationWarningQuery(
  baseOptions: Apollo.QueryHookOptions<
    DuplicateApplicationWarningQuery,
    DuplicateApplicationWarningQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    DuplicateApplicationWarningQuery,
    DuplicateApplicationWarningQueryVariables
  >(DuplicateApplicationWarningDocument, options);
}
export function useDuplicateApplicationWarningLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DuplicateApplicationWarningQuery,
    DuplicateApplicationWarningQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    DuplicateApplicationWarningQuery,
    DuplicateApplicationWarningQueryVariables
  >(DuplicateApplicationWarningDocument, options);
}
export type DuplicateApplicationWarningQueryHookResult = ReturnType<
  typeof useDuplicateApplicationWarningQuery
>;
export type DuplicateApplicationWarningLazyQueryHookResult = ReturnType<
  typeof useDuplicateApplicationWarningLazyQuery
>;
export type DuplicateApplicationWarningQueryResult = Apollo.QueryResult<
  DuplicateApplicationWarningQuery,
  DuplicateApplicationWarningQueryVariables
>;
export const BandSerachDocument = gql`
  query BandSerach($query: String!, $limit: Int!) {
    findBandPlaying(query: $query, limit: $limit) {
      name
      id
      eventId
    }
  }
`;

/**
 * __useBandSerachQuery__
 *
 * To run a query within a React component, call `useBandSerachQuery` and pass it any options that fit your needs.
 * When your component renders, `useBandSerachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBandSerachQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBandSerachQuery(
  baseOptions: Apollo.QueryHookOptions<
    BandSerachQuery,
    BandSerachQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<BandSerachQuery, BandSerachQueryVariables>(
    BandSerachDocument,
    options,
  );
}
export function useBandSerachLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BandSerachQuery,
    BandSerachQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<BandSerachQuery, BandSerachQueryVariables>(
    BandSerachDocument,
    options,
  );
}
export type BandSerachQueryHookResult = ReturnType<typeof useBandSerachQuery>;
export type BandSerachLazyQueryHookResult = ReturnType<
  typeof useBandSerachLazyQuery
>;
export type BandSerachQueryResult = Apollo.QueryResult<
  BandSerachQuery,
  BandSerachQueryVariables
>;
export const LineupTableDocument = gql`
  query LineupTable($id: ID!) {
    areas {
      ...AreaPill
    }
    event: node(id: $id) {
      ... on Event {
        id
        name
        start
        end
        bandsPlaying(first: 100) {
          edges {
            node {
              id
              slug
              ...BandBox
            }
          }
        }
      }
    }
  }
  ${AreaPillFragmentDoc}
  ${BandBoxFragmentDoc}
`;

/**
 * __useLineupTableQuery__
 *
 * To run a query within a React component, call `useLineupTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useLineupTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLineupTableQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLineupTableQuery(
  baseOptions: Apollo.QueryHookOptions<
    LineupTableQuery,
    LineupTableQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<LineupTableQuery, LineupTableQueryVariables>(
    LineupTableDocument,
    options,
  );
}
export function useLineupTableLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LineupTableQuery,
    LineupTableQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<LineupTableQuery, LineupTableQueryVariables>(
    LineupTableDocument,
    options,
  );
}
export type LineupTableQueryHookResult = ReturnType<typeof useLineupTableQuery>;
export type LineupTableLazyQueryHookResult = ReturnType<
  typeof useLineupTableLazyQuery
>;
export type LineupTableQueryResult = Apollo.QueryResult<
  LineupTableQuery,
  LineupTableQueryVariables
>;
export const YearSelectorDocument = gql`
  query YearSelector {
    events(type: Kulturspektakel) {
      id
      start
      bandsPlaying {
        totalCount
      }
    }
  }
`;

/**
 * __useYearSelectorQuery__
 *
 * To run a query within a React component, call `useYearSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useYearSelectorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYearSelectorQuery({
 *   variables: {
 *   },
 * });
 */
export function useYearSelectorQuery(
  baseOptions?: Apollo.QueryHookOptions<
    YearSelectorQuery,
    YearSelectorQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<YearSelectorQuery, YearSelectorQueryVariables>(
    YearSelectorDocument,
    options,
  );
}
export function useYearSelectorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    YearSelectorQuery,
    YearSelectorQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<YearSelectorQuery, YearSelectorQueryVariables>(
    YearSelectorDocument,
    options,
  );
}
export type YearSelectorQueryHookResult = ReturnType<
  typeof useYearSelectorQuery
>;
export type YearSelectorLazyQueryHookResult = ReturnType<
  typeof useYearSelectorLazyQuery
>;
export type YearSelectorQueryResult = Apollo.QueryResult<
  YearSelectorQuery,
  YearSelectorQueryVariables
>;
export const ThanksDocument = gql`
  query Thanks($id: ID!) {
    node(id: $id) {
      ... on Event {
        bandApplicationEnd
        djApplicationEnd
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useThanksQuery(
  baseOptions: Apollo.QueryHookOptions<ThanksQuery, ThanksQueryVariables>,
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
export const EventsDocument = gql`
  query Events {
    events(type: Other) {
      id
      ...EventDetails
    }
  }
  ${EventDetailsFragmentDoc}
`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options,
  );
}
export function useEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options,
  );
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<
  EventsQuery,
  EventsQueryVariables
>;
export const NewsDocument = gql`
  query News {
    news(first: 10) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
  ${ArticleFragmentDoc}
`;

/**
 * __useNewsQuery__
 *
 * To run a query within a React component, call `useNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsQuery(
  baseOptions?: Apollo.QueryHookOptions<NewsQuery, NewsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options);
}
export function useNewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NewsQuery, NewsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<NewsQuery, NewsQueryVariables>(
    NewsDocument,
    options,
  );
}
export type NewsQueryHookResult = ReturnType<typeof useNewsQuery>;
export type NewsLazyQueryHookResult = ReturnType<typeof useNewsLazyQuery>;
export type NewsQueryResult = Apollo.QueryResult<NewsQuery, NewsQueryVariables>;
export const LineUpStaticPathsDocument = gql`
  query LineUpStaticPaths {
    events(type: Kulturspektakel) {
      id
      start
    }
  }
`;

/**
 * __useLineUpStaticPathsQuery__
 *
 * To run a query within a React component, call `useLineUpStaticPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLineUpStaticPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLineUpStaticPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLineUpStaticPathsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LineUpStaticPathsQuery,
    LineUpStaticPathsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    LineUpStaticPathsQuery,
    LineUpStaticPathsQueryVariables
  >(LineUpStaticPathsDocument, options);
}
export function useLineUpStaticPathsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LineUpStaticPathsQuery,
    LineUpStaticPathsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    LineUpStaticPathsQuery,
    LineUpStaticPathsQueryVariables
  >(LineUpStaticPathsDocument, options);
}
export type LineUpStaticPathsQueryHookResult = ReturnType<
  typeof useLineUpStaticPathsQuery
>;
export type LineUpStaticPathsLazyQueryHookResult = ReturnType<
  typeof useLineUpStaticPathsLazyQuery
>;
export type LineUpStaticPathsQueryResult = Apollo.QueryResult<
  LineUpStaticPathsQuery,
  LineUpStaticPathsQueryVariables
>;
export const LineupRedirectDocument = gql`
  query LineupRedirect {
    events(limit: 2, type: Kulturspektakel) {
      id
      bandsPlaying {
        totalCount
      }
    }
  }
`;

/**
 * __useLineupRedirectQuery__
 *
 * To run a query within a React component, call `useLineupRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useLineupRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLineupRedirectQuery({
 *   variables: {
 *   },
 * });
 */
export function useLineupRedirectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LineupRedirectQuery,
    LineupRedirectQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<LineupRedirectQuery, LineupRedirectQueryVariables>(
    LineupRedirectDocument,
    options,
  );
}
export function useLineupRedirectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LineupRedirectQuery,
    LineupRedirectQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<LineupRedirectQuery, LineupRedirectQueryVariables>(
    LineupRedirectDocument,
    options,
  );
}
export type LineupRedirectQueryHookResult = ReturnType<
  typeof useLineupRedirectQuery
>;
export type LineupRedirectLazyQueryHookResult = ReturnType<
  typeof useLineupRedirectLazyQuery
>;
export type LineupRedirectQueryResult = Apollo.QueryResult<
  LineupRedirectQuery,
  LineupRedirectQueryVariables
>;
export const NewsSingleDocument = gql`
  query NewsSingle($id: ID!) {
    node(id: $id) {
      ... on News {
        ...Article
      }
    }
  }
  ${ArticleFragmentDoc}
`;

/**
 * __useNewsSingleQuery__
 *
 * To run a query within a React component, call `useNewsSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsSingleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsSingleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNewsSingleQuery(
  baseOptions: Apollo.QueryHookOptions<
    NewsSingleQuery,
    NewsSingleQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<NewsSingleQuery, NewsSingleQueryVariables>(
    NewsSingleDocument,
    options,
  );
}
export function useNewsSingleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NewsSingleQuery,
    NewsSingleQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<NewsSingleQuery, NewsSingleQueryVariables>(
    NewsSingleDocument,
    options,
  );
}
export type NewsSingleQueryHookResult = ReturnType<typeof useNewsSingleQuery>;
export type NewsSingleLazyQueryHookResult = ReturnType<
  typeof useNewsSingleLazyQuery
>;
export type NewsSingleQueryResult = Apollo.QueryResult<
  NewsSingleQuery,
  NewsSingleQueryVariables
>;
export const NewsArchiveDocument = gql`
  query NewsArchive {
    news(first: 200) {
      edges {
        node {
          title
          createdAt
          slug
        }
      }
    }
  }
`;

/**
 * __useNewsArchiveQuery__
 *
 * To run a query within a React component, call `useNewsArchiveQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsArchiveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsArchiveQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsArchiveQuery(
  baseOptions?: Apollo.QueryHookOptions<
    NewsArchiveQuery,
    NewsArchiveQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<NewsArchiveQuery, NewsArchiveQueryVariables>(
    NewsArchiveDocument,
    options,
  );
}
export function useNewsArchiveLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NewsArchiveQuery,
    NewsArchiveQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<NewsArchiveQuery, NewsArchiveQueryVariables>(
    NewsArchiveDocument,
    options,
  );
}
export type NewsArchiveQueryHookResult = ReturnType<typeof useNewsArchiveQuery>;
export type NewsArchiveLazyQueryHookResult = ReturnType<
  typeof useNewsArchiveLazyQuery
>;
export type NewsArchiveQueryResult = Apollo.QueryResult<
  NewsArchiveQuery,
  NewsArchiveQueryVariables
>;
export const PostersDocument = gql`
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

/**
 * __usePostersQuery__
 *
 * To run a query within a React component, call `usePostersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostersQuery(
  baseOptions?: Apollo.QueryHookOptions<PostersQuery, PostersQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<PostersQuery, PostersQueryVariables>(
    PostersDocument,
    options,
  );
}
export function usePostersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostersQuery,
    PostersQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<PostersQuery, PostersQueryVariables>(
    PostersDocument,
    options,
  );
}
export type PostersQueryHookResult = ReturnType<typeof usePostersQuery>;
export type PostersLazyQueryHookResult = ReturnType<typeof usePostersLazyQuery>;
export type PostersQueryResult = Apollo.QueryResult<
  PostersQuery,
  PostersQueryVariables
>;
