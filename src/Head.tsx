import React, {Component} from 'react';
import Stats from './Stats';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Avatar from 'antd/lib/avatar';
import Layout from 'antd/lib/layout';
import {TableRow} from './Table';
import {SlackUser} from './api';
import config from './config';
const {Header} = Layout;

type Props = {
  data: TableRow[] | null;
  slackUsers: Map<string, SlackUser>;
  myUserId: string | null;
};

type State = {
  statsVisible: boolean;
};

export default class Head extends Component<Props, State> {
  state = {
    statsVisible: false,
  };
  logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  render() {
    const {data} = this.props;
    return (
      <Header>
        {data && (
          <Stats
            visible={this.state.statsVisible}
            onHide={() =>
              this.setState({statsVisible: !this.state.statsVisible})
            }
            data={data}
            slackUsers={this.props.slackUsers}
            myUserId={this.props.myUserId}
          />
        )}
        <h1>Kulturspektakel Booking 2020</h1>
        <div className="menuRight">
          {this.props.data && (
            <span className="stats">
              {this.props.data.reduce(
                (acc, cv) => (cv.myRating ? acc + 1 : acc),
                0,
              )}
              /{(this.props.data || []).length} bewertet
            </span>
          )}
          {this.props.myUserId && (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      window.open(
                        `https://docs.google.com/spreadsheets/d/${config.googleSheet}`,
                      )
                    }
                  >
                    Google Sheet
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.setState({statsVisible: true})}
                  >
                    Statistik
                  </Menu.Item>
                  <Menu.Item onClick={this.logout}>Ausloggen</Menu.Item>
                </Menu>
              }
            >
              <Avatar
                src={
                  this.props.slackUsers.get(this.props.myUserId)!.profile
                    .image_72
                }
                size={36}
              />
            </Dropdown>
          )}
        </div>
      </Header>
    );
  }
}
