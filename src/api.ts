import config from './config';
import {TableRow} from './Table';

export type SlackResponse = {
  ok: true;
  oldest: string;
  messages: Array<SlackMessage>;
  has_more: boolean;
  warning?: string;
};

export type SlackUserResponse = {
  ok: true;
  members: Array<SlackUser>;
};

export type GoogleResponse = {
  range: string;
  majorDimension: 'ROWS';
  values: Array<Array<string>>;
};

export type SlackUser = {
  color: string;
  deleted: boolean;
  has_2fa: boolean;
  id: string;
  is_admin: boolean;
  is_app_user: boolean;
  is_bot: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  name: string;
  profile: {
    avatar_hash: string;
    first_name: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
    image_original: string;
    last_name: string;
    phone: string;
    real_name: string;
    skype: string;
    status_emoji: string;
    team: string;
    title: string;
  };
  real_name: string;
  team_id: string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  updated: number;
};

export type SlackReply = {
  user: string | SlackUser;
  ts: string;
  text: string;
};

export type SlackReaction = {
  name: string;
  count: number;
  users: Array<string>;
};

export type SlackMessage = {
  type: 'message';
  blocks?: Array<{
    block_id: string;
    text: {
      text: string;
    };
    type: string;
  }>;
  user: string | SlackUser;
  text: string;
  thread_ts: string;
  reply_count: number;
  replies: Array<SlackReply> | undefined;
  subscribed: boolean;
  last_read: string;
  unread_count: number;
  ts: string;
  bot_id?: string;
  reactions: Array<SlackReaction> | undefined;
};

export async function _loadSlackData(
  oldest: number,
): Promise<Array<SlackMessage>> {
  try {
    const res = await fetch('https://slack.com/api/channels.history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `token=${
        JSON.parse(window.localStorage.getItem('login')!).access_token
      }&channel=${config.slackChannel}&count=1000&oldest=${oldest}`,
    });
    const data: SlackResponse = await res.json();
    let newer: SlackMessage[] = [];
    if (data.has_more) {
      newer = await _loadSlackData(parseInt(data.messages[0].ts, 10) + 1);
    }
    return [...data.messages.reverse(), ...newer];
  } catch (e) {
    return [];
  }
}

export async function _loadSlackUsers(): Promise<Map<string, SlackUser>> {
  try {
    const res = await fetch('https://slack.com/api/users.list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `token=${
        JSON.parse(window.localStorage.getItem('login')!).access_token
      }&limit=1000`,
    });
    const data: SlackUserResponse = await res.json();
    return data.members.reduce((acc, cv) => acc.set(cv.id, cv), new Map());
  } catch (e) {
    return new Map();
  }
}

export async function _loadGoogleData(): Promise<TableRow[]> {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.googleSheet}/values/A1:Z10000?key=${config.googleAPIKey}`,
    );
    const {values}: GoogleResponse = await res.json();
    return values
      .filter((_, i) => i !== 0)
      .map(
        (row, j) =>
          row.reduce((acc: any, cv, i) => {
            acc[config.colMapping[i]] = cv;
            acc.index = j + 1;
            return acc;
          }, {}) as TableRow,
      );
  } catch (e) {
    return [];
  }
}
