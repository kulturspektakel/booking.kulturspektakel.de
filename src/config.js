// @flow

import type {TableRow} from './Core.js';

export default {
  slackClientID: process.env.REACT_APP_SLACK_CLIENT_ID,
  slackClientSecret: process.env.REACT_APP_SLACK_CLIENT_SECRET,
  googleSheet: process.env.REACT_APP_GOOGLE_SHEET,
  googleAPIKey: process.env.REACT_APP_GOOGLE_API_KEY,
  slackChannel: 'C3U99AB54',
  slackOldestMessage: 1535660000,
  slackBotID: 'B3TGP9TKM',
  genres: {
    'Pop / Indie-Rock': '/genre_pop.svg',
    'Hardrock / Metal / Punk': '/genre_metal.svg',
    'Folk / Singer/ Songwriter': '/genre_acoustic.svg',
    'Elektro / Hip Hop / DJ': '/genre_hip_hop.svg',
    'Reggae / Ska': 'genre_hippie.svg',
    'andere Musikrichtung': 'genre_other.svg',
  },
  ratings: {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
  },
  colMapping: ([
    'timestamp',
    'email',
    'bandname',
    'musikrichtung',
    'genre',
    'wohnort',
    'facebook',
    'demo',
    'website',
    'beschreibung',
    'name',
    'handy',
    'woher',
    'aufmerksam',
    'anreise',
    'entfernung',
    'likes',
  ]: Array<$Keys<TableRow>>),
};
