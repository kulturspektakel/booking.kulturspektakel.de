// @flow

import React, {Fragment, Component} from 'react';
import Tooltip from 'antd/lib/tooltip';
import config from './config';
import './Rating.css';

import type {TableRow} from './Core';

type Props = {
  record: TableRow,
};

export default class Rating extends Component<Props> {
  render() {
    const tooltip = this.props.record.slackData
      ? (this.props.record.slackData.reactions || [])
          .map(r => ({...r, rating: config.ratings[r.name]}))
          .filter(r => Boolean(r.rating))
          .reduce((acc, cv) => {
            cv.users.forEach(u => {
              acc.push(`${u}: ${cv.rating}`);
            });
            return acc;
          }, [])
          .join('\n')
      : null;

    return (
      <div className={`Rating ${this.props.record.myRating ? 'rated' : ''}`}>
        {!this.props.record.myRating ? (
          'n/a'
        ) : (
          <Tooltip title={tooltip} placement="left">
            {this.props.record.rating.toFixed(1)}
          </Tooltip>
        )}
      </div>
    );
  }
}
