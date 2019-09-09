import React, {Component} from 'react';
import Sidebar from './Sidebar';
import Table, {TableRow} from './Table';
import Head from './Head';
import Spin from 'antd/lib/spin';
import Drawer from 'antd/lib/drawer';
import Layout from 'antd/lib/layout';
import config from './config';
import {
  SlackMessage,
  SlackUser,
  _loadGoogleData,
  _loadSlackData,
  _loadSlackUsers,
} from './api';
import {_getAverageRating, _getMyRating} from './Rating';

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
  [x: string]: any;
  state: State = {
    selectedRow: null,
    data: null,
    slackUsers: new Map<string, SlackUser>(),
    myUserId: null,
  };

  componentDidMount() {
    Promise.all([
      _loadGoogleData(),
      _loadSlackData(config.slackOldestMessage),
      _loadSlackUsers(),
    ]).then(([googleData, slackMessages, slackUsers]) => {
      slackMessages = this._findCorrespondingUser(slackMessages, slackUsers);
      const myUserId = JSON.parse(localStorage.getItem('login') || '{}')
        .user_id;

      const data = googleData.map(this._findCorrespondingBand(slackMessages));
      let selectedRow: TableRow | null = null;
      if (window.location.hash.length > 1) {
        selectedRow =
          data.find(
            row =>
              '#' + row.timestamp.replace(/\D/g, '') === window.location.hash,
          ) || null;
      }
      this.setState({data, slackUsers, myUserId, selectedRow});
    });
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

  _findCorrespondingBand = (slackDatas: Array<SlackMessage>) => {
    return (tableRow: TableRow) => {
      const id = tableRow.timestamp.replace(/\D/g, '');

      tableRow.slackData = slackDatas.find(slack => {
        if (!slack.blocks) {
          return false;
        }
        const match = slack.blocks[0].text.text.match(
          /\*<https:\/\/booking\.kulturspektakel\.de#(\d+)\|(.+)>\*/,
        );
        if (match && match.length > 1 && match[1] === id) {
          return true;
        }
        return false;
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
        tableRow.rating = _getAverageRating(slackData.reactions || []);
        tableRow.myRating = _getMyRating(slackData.reactions || []);
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
      tableRow.rating = _getAverageRating(slackData.reactions || []);
      tableRow.myRating = _getMyRating(slackData.reactions || []);
      this._onUpdateItem();

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

      this._onUpdateItem();
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

  _onSelect = (tableRow: TableRow) => {
    window.location.hash = tableRow.timestamp.replace(/\D/g, '');
    this.setState({selectedRow: tableRow});
  };

  _onClose = () => {
    window.history.replaceState(null, '', window.location.pathname);
    this.setState({selectedRow: null});
  };

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
                onClose={this._onClose}
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
