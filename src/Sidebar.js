// @flow
import type {TableRow} from './Core.js';
import type {SlackUser} from './Core.js';

import React, {Fragment, Component} from 'react';
import Icon from 'antd/lib/icon';
import Rate from 'antd/lib/rate';
import Badge from 'antd/lib/badge';
import Tabs from 'antd/lib/tabs';
import Player from './Player';
import Comments from './Comments';
import ShowMore from './ShowMore';
import Rating from './Rating';
import Map from './Map';
import './Sidebar.css';

const TabPane = Tabs.TabPane;

type Props = {
  tableRow: ?TableRow,
  myUser: ?SlackUser,
};

type State = {};

export default class Sidebar extends Component<Props, State> {
  render() {
    const myRating =
      this.props.tableRow &&
      this.props.tableRow.rating &&
      this.props.tableRow.myRating
        ? this.props.tableRow.rating.toFixed(1)
        : null;
    return (
      <div className={`Sidebar ${this.props.tableRow ? 'visible' : ''}`}>
        {this.props.tableRow && (
          <div>
            <Tabs animated={false} type="card">
              <TabPane tab="Info" key="1">
                <Player href={this.props.tableRow.demo} />
                <ShowMore limit={300}>
                  {this.props.tableRow.beschreibung}
                </ShowMore>
                <div className="Rater">
                  <Rate
                    value={this.props.tableRow.myRating}
                    count={4}
                    onChange={this.props.tableRow.onRate}
                    style={{color: '#4795F7', fontSize: 30}}
                  />
                  <div className="avg">
                    <Rating record={this.props.tableRow} />
                  </div>
                </div>

                <table>
                  <tbody>
                    <tr>
                      <th>Genre</th>
                      <td>{this.props.tableRow.genre}</td>
                    </tr>
                    <tr>
                      <th>Wohnort</th>
                      <td>
                        {this.props.tableRow.wohnort}
                        {this.props.tableRow.entfernung &&
                          ` (${this.props.tableRow.entfernung}km)`}
                      </td>
                    </tr>
                    {this.props.tableRow.facebook && (
                      <tr>
                        <th>Facebook</th>
                        <td>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={this.props.tableRow.facebook}
                          >
                            {this.props.tableRow.likes ? (
                              <Fragment>
                                <Icon type="like" theme="outlined" />
                                {this.props.tableRow.likes}
                              </Fragment>
                            ) : (
                              this.props.tableRow.facebook
                            )}
                          </a>
                        </td>
                      </tr>
                    )}
                    {this.props.tableRow.website && (
                      <tr>
                        <th>Webseite</th>
                        <td>
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={this.props.tableRow.website}
                          >
                            {this.props.tableRow.website}
                          </a>
                        </td>
                      </tr>
                    )}
                    {this.props.tableRow.aufmerksam && (
                      <tr>
                        <th>Gefunden durch</th>
                        <td>{this.props.tableRow.aufmerksam}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p>
                  <h3>Kontakt</h3>
                  {this.props.tableRow.name}
                  <br />
                  {this.props.tableRow.handy}
                  <br />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://mail.google.com/mail/u/booking@kulturspektakel.de?view=cm&fs=1&to=${
                      this.props.tableRow.email
                    }`}
                  >
                    {this.props.tableRow.email}
                  </a>
                </p>

                {/* <Map googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" /> */}

                {this.props.tableRow.woher && (
                  <Fragment>
                    <h3>Woher kennt ihr das Kult?</h3>
                    <ShowMore limit={300}>{this.props.tableRow.woher}</ShowMore>
                  </Fragment>
                )}
              </TabPane>
              {this.props.myUser && (
                <TabPane
                  tab={
                    <span>
                      Kommentare{' '}
                      <Badge
                        style={{top: 5, backgroundColor: '#4A98F4'}}
                        count={
                          this.props.tableRow.slackData &&
                          (this.props.tableRow.slackData.replies || []).length
                        }
                      />
                    </span>
                  }
                  key="2"
                >
                  <Comments
                    record={this.props.tableRow}
                    myUser={this.props.myUser}
                  />
                </TabPane>
              )}
            </Tabs>
          </div>
        )}
      </div>
    );
  }
}
