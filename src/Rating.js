// @flow

import React, {Fragment, Component} from 'react';
import Tooltip from 'antd/lib/tooltip';
import config from './config';
import {Context} from './Core';
import './Rating.css';

import type {TableRow} from './Core';

type Props = {
  record: TableRow,
};

const STAR = ['', '★☆☆☆', '★★☆☆', '★★★☆', '★★★★'];

export default class Rating extends Component<Props> {
  render() {
    return (
      <div className={`Rating ${this.props.record.myRating ? 'rated' : ''}`}>
        {!this.props.record.myRating ? (
          'n/a'
        ) : (
          <Context.Consumer>
            {context => (
              <Tooltip
                title={
                  <Fragment>
                    {this.props.record.slackData
                      ? (this.props.record.slackData.reactions || [])
                          .map(r => ({...r, rating: config.ratings[r.name]}))
                          .filter(r => Boolean(r.rating))
                          .reduce((acc, cv) => {
                            cv.users.forEach(u => {
                              acc.push(
                                `${STAR[cv.rating]} ${
                                  context.slackUsers.get(u).real_name
                                }`,
                              );
                            });
                            return acc;
                          }, [])
                          .map(a => <div key={a}>{a}</div>)
                      : null}
                  </Fragment>
                }
                placement="left"
              >
                {(this.props.record.rating || 0).toFixed(1)}
              </Tooltip>
            )}
          </Context.Consumer>
        )}
      </div>
    );
  }
}
