import React, {Fragment, Component} from 'react';
import Icon from 'antd/lib/icon';
import Rate from 'antd/lib/rate';
import Badge from 'antd/lib/badge';
import Popconfirm from 'antd/lib/popconfirm';
import Tabs from 'antd/lib/tabs';
import Player from './Player';
import Comments from './Comments';
import ShowMore from './ShowMore';
import Rating from './Rating';
import config from './config';
import {TableRow} from './Table';
import {SlackUser} from './api';
import './Sidebar.css';

const TabPane = Tabs.TabPane;

type Props = {
  tableRow: TableRow | null;
  myUser: SlackUser | null;
};

type State = {
  showPopconfirm: boolean;
};

export default class Sidebar extends Component<Props, State> {
  state = {
    showPopconfirm: false,
  };

  componentDidMount() {
    document.addEventListener('copy', this.onCopy);
  }

  componentWillUnmount() {
    document.removeEventListener('copy', this.onCopy);
  }

  onCopy = (_e: ClipboardEvent) => {
    const email = window.getSelection()!.toString();
    if (email.includes('@')) {
      this.markAsContacted();
    }
  };

  markAsContacted = () => {
    if (
      this.props.tableRow &&
      this.props.tableRow.slackData &&
      (this.props.tableRow.slackData.reactions || []).findIndex(
        r => r.name === config.contactedEmoji,
      ) === -1
    ) {
      this.setState({showPopconfirm: true});
    }
  };

  render() {
    const {tableRow} = this.props;
    return (
      <div className={`Sidebar ${this.props.tableRow ? 'visible' : ''}`}>
        {tableRow && (
          <div>
            <Tabs animated={false} type="card">
              <TabPane tab="Info" key="1">
                <Player href={tableRow.demo} />
                <ShowMore limit={300}>{tableRow.beschreibung}</ShowMore>
                <div className="Rater">
                  <Rate
                    value={tableRow.myRating}
                    count={4}
                    onChange={tableRow.onRate}
                    style={{color: '#4795F7', fontSize: 30}}
                  />
                  <div className="avg">
                    <Rating record={tableRow} />
                  </div>
                </div>

                <table>
                  <tbody>
                    <tr>
                      <th>Genre</th>
                      <td>{tableRow.genre}</td>
                    </tr>
                    <tr>
                      <th>Wohnort</th>
                      <td>
                        {tableRow.wohnort}
                        {tableRow.entfernung && ` (${tableRow.entfernung}km)`}
                      </td>
                    </tr>
                    {tableRow.facebook && (
                      <tr>
                        <th>Facebook</th>
                        <td>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={tableRow.facebook}
                          >
                            {tableRow.likes ? (
                              <Fragment>
                                <Icon type="like" theme="outlined" />
                                {tableRow.likes}
                              </Fragment>
                            ) : (
                              tableRow.facebook
                            )}
                          </a>
                        </td>
                      </tr>
                    )}
                    {tableRow.website && (
                      <tr>
                        <th>Webseite</th>
                        <td>
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={tableRow.website}
                          >
                            {tableRow.website}
                          </a>
                        </td>
                      </tr>
                    )}
                    {tableRow.aufmerksam && (
                      <tr>
                        <th>Gefunden durch</th>
                        <td>{tableRow.aufmerksam}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p>
                  <h3>Kontakt</h3>
                  {tableRow.name}
                  <br />
                  {tableRow.handy}
                  <br />
                  <Popconfirm
                    title="Soll die Band als kontaktiert markiert werden?"
                    okText="Ja"
                    cancelText="Nein"
                    onConfirm={() => {
                      if (
                        this.props.tableRow &&
                        this.props.tableRow.onToggleContacted
                      ) {
                        this.props.tableRow.onToggleContacted();
                      }
                      this.setState({showPopconfirm: false});
                    }}
                    onCancel={() => this.setState({showPopconfirm: false})}
                    visible={this.state.showPopconfirm}
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="#"
                      onMouseUp={() => {
                        window.open(
                          `https://mail.google.com/mail/u/booking@kulturspektakel.de?view=cm&fs=1&to=${
                            tableRow.email
                          }`,
                        );
                        this.markAsContacted();
                      }}
                    >
                      {tableRow.email}
                    </a>
                  </Popconfirm>
                </p>

                {/* <Map googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" /> */}

                {tableRow.woher && (
                  <Fragment>
                    <h3>Woher kennt ihr das Kult?</h3>
                    <ShowMore limit={300}>{tableRow.woher}</ShowMore>
                  </Fragment>
                )}
              </TabPane>
              {this.props.myUser && (
                <TabPane
                  tab={
                    <span>
                      Kommentare{' '}
                      <Badge
                        style={{backgroundColor: '#4A98F4'}}
                        count={
                          tableRow.slackData &&
                          (tableRow.slackData.replies || []).length
                        }
                      />
                    </span>
                  }
                  key="2"
                >
                  <Comments record={tableRow} myUser={this.props.myUser} />
                </TabPane>
              )}
            </Tabs>
          </div>
        )}
      </div>
    );
  }
}
