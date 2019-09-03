import React, {Component} from 'react';
import Sidebar from './Sidebar';
import Table from './Table';
import Head from './Head';
import Spin from 'antd/lib/spin';
import Drawer from 'antd/lib/drawer';
import Layout from 'antd/lib/layout';
import config from './config';

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

type SlackResponse = {
  ok: true;
  oldest: string;
  messages: Array<SlackMessage>;
  has_more: boolean;
  warning?: string;
};

type SlackUserResponse = {
  ok: true;
  members: Array<SlackUser>;
};

type GoogleResponse = {
  range: string;
  majorDimension: 'ROWS';
  values: Array<Array<string>>;
};

export type TableRow = {
  timestamp: string;
  email: string;
  bandname: string;
  musikrichtung: string;
  genre: string;
  wohnort: string;
  facebook: string;
  demo: string;
  website: string;
  beschreibung: string;
  name: string;
  handy: string;
  woher: string;
  aufmerksam: string;
  anreise: string;
  entfernung: string;
  likes: string;
  slackData?: SlackMessage | undefined;
  rating?: number | null;
  onRate?: (rating: number) => any;
  onToggleContacted?: () => any;
  myRating?: number | undefined;
  onUpdate?: () => void;
};

type State = {
  data: Array<TableRow> | null;
  selectedRow: TableRow | null;
  slackUsers: Map<string, SlackUser>;
  myUserId: string | null;
};

export const Context = React.createContext<{
  slackUsers: Map<string, SlackUser>;
}>({slackUsers: new Map()});

class Core extends Component<{}, State> {
  state: State = {
    selectedRow: null,
    data: null,
    slackUsers: new Map<string, SlackUser>(),
    myUserId: null,
  };

  componentDidMount() {
    Promise.all([
      this._loadGoogleData(),
      this._loadSlackData(config.slackOldestMessage),
      this._loadSlackUsers(),
    ]).then(([googleData, slackMessages, slackUsers]) => {
      slackMessages = this._findCorrespondingUser(slackMessages, slackUsers);
      const myUserId = JSON.parse(localStorage.getItem('login') || '{}')
        .user_id;

      const data = googleData.map(this._findCorrespondingBand(slackMessages));
      this.setState({data, slackUsers, myUserId});
    });
  }

  async _loadSlackData(oldest: number): Promise<Array<SlackMessage>> {
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
        newer = await this._loadSlackData(
          parseInt(data.messages[0].ts, 10) + 1,
        );
      }
      return [...data.messages.reverse(), ...newer];
    } catch (e) {
      return [];
    }
  }

  async _loadSlackUsers(): Promise<Map<string, SlackUser>> {
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

  async _loadGoogleData(): Promise<TableRow[]> {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${
          config.googleSheet
        }/values/A1:Z10000?key=${config.googleAPIKey}`,
      );
      const {values}: GoogleResponse = await res.json();
      return values.filter((_, i) => i !== 0).map(
        row =>
          row.reduce((acc: any, cv, i) => {
            acc[config.colMapping[i]] = cv;
            return acc;
          }, {}) as TableRow,
      );
    } catch (e) {
      return [];
    }
  }

  _findCorrespondingUser(
    slackData: Array<SlackMessage>,
    users: Map<string, SlackUser>,
  ): Array<SlackMessage> {
    return slackData.map(slack => ({
      ...slack,
      user:
        typeof slack.user === 'string' ? users.get(slack.user)! : slack.user,
    }));
  }

  _getAverageRating(reactions: Array<SlackReaction> = []): number | null {
    const validReaction = (reaction: {name: string}) =>
      reaction.name in config.ratings;
    reactions = reactions.filter(validReaction);
    if (reactions.length === 0) {
      return null;
    }
    return (
      reactions.reduce(
        (acc, cv) =>
          acc +
          cv.count * config.ratings[cv.name as keyof typeof config.ratings],
        0,
      ) / reactions.reduce((acc, cv) => acc + cv.count, 0)
    );
  }

  _getMyRating(reactions: Array<SlackReaction> = []): number | undefined {
    const myUser = JSON.parse(window.localStorage.getItem('login')!).user_id;
    const reaction = reactions.filter(
      reaction => reaction.users.findIndex(user => user === myUser) > -1,
    );
    if (reaction.length > 0) {
      return config.ratings[reaction[0].name as keyof typeof config.ratings];
    }
  }

  _findCorrespondingBand = (slackDatas: Array<SlackMessage>) => {
    return (tableRow: TableRow) => {
      tableRow.slackData = slackDatas.find(slack => {
        const slackBandName = slack.text
          .split('\n')[0]
          .trim()
          .toLowerCase()
          .replace(/^\*/, '')
          .replace(/\*$/, '')
          .replace('&amp;', '&');

        const bandname = tableRow.bandname.toLowerCase();

        return Boolean(
          slack.bot_id &&
            slack.bot_id === config.slackBotID &&
            (slackBandName === bandname ||
              // if band name is a URL, Slack will auto encode it
              slackBandName === `<http://${bandname}|${bandname}>`),
        );
      });
      const {slackData} = tableRow;
      if (slackData) {
        const {replies} = slackData;
        // adding comments
        if (replies) {
          slackData.replies = replies
            .map(comment => slackDatas.find(slack => slack.ts === comment.ts))
            .filter(Boolean) as SlackMessage[];
        }

        // adding average rating
        tableRow.rating = this._getAverageRating(slackData.reactions || []);
        tableRow.myRating = this._getMyRating(slackData.reactions || []);
        tableRow.onRate = this._onRate(tableRow);
        tableRow.onToggleContacted = this._onToggleContacted(tableRow);
        tableRow.onUpdate = this._onUpdateItem;
      }
      return tableRow;
    };
  };

  _onRate = (tableRow: TableRow) => async (
    rating: number,
  ): Promise<boolean> => {
    const {slackData} = tableRow;
    const {user_id, access_token} = JSON.parse(
      window.localStorage.getItem('login')!,
    );

    if (slackData) {
      const emoji = Object.keys(config.ratings)[rating - 1];
      const reaction = (slackData.reactions || []).find(r => r.name === emoji);
      (slackData.reactions || []).forEach(r => {
        const i = r.users.indexOf(user_id);
        if (i > -1) {
          r.count -= 1;
          r.users.splice(i, 1);
        }
      });
      if (reaction) {
        reaction.count += 1;
        reaction.users.push(user_id);
      } else {
        slackData.reactions = (slackData.reactions || []).concat({
          count: 1,
          name: emoji,
          users: [user_id],
        });
      }
      tableRow.rating = this._getAverageRating(slackData.reactions || []);
      tableRow.myRating = this._getMyRating(slackData.reactions || []);
      this.setState({data: this.state.data});

      // remove all my reactions
      await Promise.all(
        Object.keys(config.ratings).map(emoji =>
          fetch(
            `https://slack.com/api/reactions.remove?token=${access_token}&name=${emoji}&channel=${
              config.slackChannel
            }&timestamp=${slackData.ts}`,
          ),
        ),
      );
      return fetch(
        `https://slack.com/api/reactions.add?token=${access_token}&name=${emoji}&channel=${
          config.slackChannel
        }&timestamp=${slackData.ts}`,
      ).then(() => true);
    } else {
      return Promise.reject();
    }
  };

  _onToggleContacted = (tableRow: TableRow) => async (): Promise<boolean> => {
    const {slackData} = tableRow;
    const {access_token, user_id} = JSON.parse(
      window.localStorage.getItem('login')!,
    );

    if (slackData) {
      const contacted = (slackData.reactions || []).findIndex(
        reaction => reaction.name === config.contactedEmoji,
      );

      if (contacted > -1) {
        (slackData.reactions || []).splice(contacted, 1);
      } else {
        if (!slackData.reactions) {
          slackData.reactions = [];
        }

        (slackData.reactions || []).push({
          name: config.contactedEmoji,
          count: 1,
          users: [user_id],
        });
      }

      this.setState({data: this.state.data});
      return fetch(
        `https://slack.com/api/reactions.${
          contacted > -1 ? 'remove' : 'add'
        }?token=${access_token}&name=${config.contactedEmoji}&channel=${
          config.slackChannel
        }&timestamp=${slackData.ts}`,
      ).then(() => true);
    } else {
      return Promise.reject();
    }
  };

  _onUpdateItem = () => {
    this.setState({data: this.state.data});
  };

  _onSelect = (tableRow: TableRow) => this.setState({selectedRow: tableRow});

  render() {
    const {data, myUserId} = this.state;
    return (
      <div className="App">
        {!data || !myUserId ? (
          <Spin
            size="large"
            style={{marginTop: '45vh', display: 'inline-block'}}
          />
        ) : (
          <Context.Provider value={{slackUsers: this.state.slackUsers}}>
            <Layout>
              <Head
                data={this.state.data}
                slackUsers={this.state.slackUsers}
                myUserId={this.state.myUserId}
              />
              <Table data={data} onSelect={this._onSelect} />
              <Drawer
                title={
                  this.state.selectedRow && this.state.selectedRow.bandname
                }
                placement="right"
                destroyOnClose={true}
                onClose={() => this.setState({selectedRow: null})}
                visible={Boolean(this.state.selectedRow)}
                width={500}
              >
                <Sidebar
                  tableRow={this.state.selectedRow}
                  myUser={this.state.slackUsers.get(myUserId)!}
                />
              </Drawer>
            </Layout>
          </Context.Provider>
        )}
      </div>
    );
  }
}

export default Core;
