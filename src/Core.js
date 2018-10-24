// @flow
import React, {Component} from 'react';
import Sidebar from './Sidebar';
import Table from './Table';
import Spin from 'antd/lib/spin';
import Drawer from 'antd/lib/drawer';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Avatar from 'antd/lib/avatar';
import Layout from 'antd/lib/layout';
import config from './config';
const {Header} = Layout;

export type SlackUser = {
  color: string,
  deleted: boolean,
  has_2fa: boolean,
  id: string,
  is_admin: boolean,
  is_app_user: boolean,
  is_bot: boolean,
  is_owner: boolean,
  is_primary_owner: boolean,
  is_restricted: boolean,
  is_ultra_restricted: boolean,
  name: string,
  profile: {
    avatar_hash: string,
    first_name: string,
    image_24: string,
    image_32: string,
    image_48: string,
    image_72: string,
    image_192: string,
    image_512: string,
    image_1024: string,
    image_original: string,
    last_name: string,
    phone: string,
    real_name: string,
    skype: string,
    status_emoji: string,
    team: string,
    title: string,
  },
  real_name: string,
  team_id: string,
  tz: string,
  tz_label: string,
  tz_offset: number,
  updated: number,
};

export type SlackReply = {
  user: string | SlackUser,
  ts: string,
  text: string,
};

type SlackReaction = {
  name: string,
  count: number,
  users: Array<string>,
};

type SlackMessage = {
  type: 'message',
  user: string | SlackUser,
  text: string,
  thread_ts: string,
  reply_count: number,
  replies: Array<SlackReply>,
  subscribed: boolean,
  last_read: string,
  unread_count: number,
  ts: string,
  bot_id?: string,
  reactions: ?Array<SlackReaction>,
};

type SlackResponse = {
  ok: true,
  oldest: string,
  messages: Array<SlackMessage>,
  has_more: boolean,
  warning?: string,
};

type SlackUserResponse = {
  ok: true,
  members: Array<SlackUser>,
};

type GoogleResponse = {
  range: string,
  majorDimension: 'ROWS',
  values: Array<Array<string>>,
};

export type TableRow = {
  timestamp: string,
  email: string,
  bandname: string,
  musikrichtung: string,
  genre: string,
  wohnort: string,
  facebook: string,
  demo: string,
  website: string,
  beschreibung: string,
  name: string,
  handy: string,
  woher: string,
  aufmerksam: string,
  anreise: string,
  entfernung: string,
  likes: string,
  slackData?: ?SlackMessage,
  rating?: ?number,
  onRate?: number => mixed,
  myRating?: ?number,
  onUpdate?: () => void,
};

type State = {
  data: ?Array<TableRow>,
  selectedRow: ?TableRow,
  slackUsers: Map<string, SlackUser>,
  myUserId: ?string,
};

export const Context = React.createContext({slackUsers: null});

class Core extends Component<*, State> {
  state = {
    selectedRow: null,
    data: null,
    slackUsers: (new Map(): Map<string, SlackUser>),
    myUserId: null,
  };

  componentDidMount() {
    Promise.all([
      this._loadGoogleData(),
      this._loadSlackData(config.slackOldestMessage),
      this._loadSlackUsers(),
    ]).then(([googleData, slackMessages, slackUsers]) => {
      slackMessages = this._findCorrespondingUser(slackMessages, slackUsers);
      const myUserId: ?string = JSON.parse(
        localStorage.getItem('login') || '{}',
      ).user_id;

      const data = googleData.map(
        this._findCorrespondingBand(slackMessages, slackUsers),
      );
      this.setState({data, slackUsers, myUserId});
    });
  }

  _loadSlackData(oldest: number): Promise<Array<SlackMessage>> {
    return fetch('https://slack.com/api/channels.history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `token=${
        JSON.parse(window.localStorage.getItem('login')).access_token
      }&channel=${config.slackChannel}&count=1000&oldest=${oldest}`,
    })
      .then(res => res.json())
      .then(async (res: SlackResponse) => {
        let newer = [];
        if (res.has_more) {
          newer = await this._loadSlackData(
            parseInt(res.messages[0].ts, 10) + 1,
          );
        }
        return [...res.messages.reverse(), ...newer];
      })
      .catch(() => []);
  }

  _loadSlackUsers(): Promise<Map<string, SlackUser>> {
    return fetch('https://slack.com/api/users.list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `token=${
        JSON.parse(window.localStorage.getItem('login')).access_token
      }&limit=1000`,
    })
      .then(res => res.json())
      .then((data: SlackUserResponse) =>
        data.members.reduce((acc, cv) => acc.set(cv.id, cv), new Map()),
      )
      .catch(() => new Map());
  }

  _loadGoogleData(): Promise<Array<TableRow>> {
    return fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${
        config.googleSheet
      }/values/A1:Z10000?key=${config.googleAPIKey}`,
    )
      .then(res => res.json())
      .then((res: GoogleResponse) =>
        res.values.filter((_, i) => i !== 0).map(row =>
          row.reduce((acc, cv, i) => {
            acc[config.colMapping[i]] = cv;
            return acc;
          }, {}),
        ),
      )
      .catch(() => []);
  }

  _findCorrespondingUser(
    slackData: Array<SlackMessage>,
    users: Map<string, SlackUser>,
  ): Array<SlackMessage> {
    return slackData.map(slack => ({
      ...slack,
      user: typeof slack.user === 'string' ? users.get(slack.user) : slack.user,
    }));
  }

  _getAverageRating(reactions: Array<SlackReaction> = []): ?number {
    const validReaction = (reaction: {name: string}) =>
      reaction.name in config.ratings;
    reactions = reactions.filter(validReaction);
    if (reactions.length === 0) {
      return null;
    }
    return (
      reactions.reduce(
        (acc, cv) => acc + cv.count * config.ratings[cv.name],
        0,
      ) / reactions.reduce((acc, cv) => acc + cv.count, 0)
    );
  }

  _getMyRating(reactions: Array<SlackReaction> = []): ?number {
    const myUser = JSON.parse(window.localStorage.getItem('login')).user_id;
    const reaction = reactions.filter(
      reaction => reaction.users.findIndex(user => user === myUser) > -1,
    );
    if (reaction.length > 0) {
      return config.ratings[reaction[0].name];
    }
  }

  _findCorrespondingBand = (
    slackDatas: Array<SlackMessage>,
    users: Array<SlackUser>,
  ) => {
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

        return (
          slack.bot_id &&
          slack.bot_id === config.slackBotID &&
          (slackBandName === bandname ||
            // if band name is a URL, Slack will auto encode it
            slackBandName === `<http://${bandname}|${bandname}>`)
        );
      });
      const {slackData} = tableRow;
      if (slackData) {
        // adding comments
        if (slackData.replies) {
          slackData.replies = slackData.replies
            .map(comment => slackDatas.find(slack => slack.ts === comment.ts))
            .filter(Boolean);
        }

        // adding average rating
        tableRow.rating = this._getAverageRating(slackData.reactions || []);
        tableRow.myRating = this._getMyRating(slackData.reactions || []);
        tableRow.onRate = this._onRate(tableRow);

        tableRow.onUpdate = this._onUpdateItem();
      }
      return tableRow;
    };
  };

  _onRate = (tableRow: TableRow) => async (
    rating: number,
  ): Promise<boolean> => {
    const {slackData} = tableRow;
    const token = JSON.parse(window.localStorage.getItem('login')).access_token;

    if (slackData) {
      const emoji = Object.keys(config.ratings)[rating - 1];
      const user = JSON.parse(window.localStorage.getItem('login')).user_id;
      const reaction = (slackData.reactions || []).find(r => r.name === emoji);
      (slackData.reactions || []).forEach(r => {
        const i = r.users.indexOf(user);
        if (i > -1) {
          r.count -= 1;
          r.users.splice(i, 1);
        }
      });
      if (reaction) {
        reaction.count += 1;
        reaction.users.push(user);
      } else {
        slackData.reactions = (slackData.reactions || []).concat({
          count: 1,
          name: emoji,
          users: [user],
        });
      }
      tableRow.rating = this._getAverageRating(slackData.reactions || []);
      tableRow.myRating = this._getMyRating(slackData.reactions || []);
      this.setState({data: this.state.data});

      // remove all my reactions
      await Promise.all(
        Object.keys(config.ratings).map(emoji =>
          fetch(
            `https://slack.com/api/reactions.remove?token=${token}&name=${emoji}&channel=${
              config.slackChannel
            }&timestamp=${slackData.ts}`,
          ),
        ),
      );
      return fetch(
        `https://slack.com/api/reactions.add?token=${token}&name=${emoji}&channel=${
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

  logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  render() {
    const {data} = this.state;
    return (
      <div className="App">
        {!data ? (
          <Spin
            size="large"
            style={{marginTop: '45vh', display: 'inline-block'}}
          />
        ) : (
          <Layout>
            <Header>
              <h1>Kulturspektakel Booking 2019</h1>
              {this.state.myUserId && (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={this.logout}>Ausloggen</Menu.Item>
                    </Menu>
                  }
                >
                  <Avatar
                    src={
                      this.state.slackUsers.get(this.state.myUserId).profile
                        .image_72
                    }
                    size={36}
                  />
                </Dropdown>
              )}
            </Header>
            <Context.Provider value={{slackUsers: this.state.slackUsers}}>
              <Table
                data={data}
                onSelect={(tableRow: TableRow) =>
                  this.setState({selectedRow: tableRow})
                }
              />
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
                  myUser={this.state.slackUsers.get(this.state.myUserId)}
                />
              </Drawer>
            </Context.Provider>
          </Layout>
        )}
      </div>
    );
  }
}

export default Core;
