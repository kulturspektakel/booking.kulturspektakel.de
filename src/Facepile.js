// @flow

import React, {Fragment, Component} from 'react';
import Tooltip from 'antd/lib/tooltip';
import Avatar from 'antd/lib/avatar';
import config from './config';
import {Context} from './Core';
import './Facepile.css';

import type {TableRow} from './Core';

type Props = {
  record: TableRow,
};

export default class Facepile extends Component<Props> {
  render() {
    return (
      <Context.Consumer>
        {context => {
          const {slackData} = this.props.record;

          if (slackData && slackData.reactions) {
            const validReaction = (reaction: {name: string}) =>
              reaction.name in config.ratings;

            return (
              <div className="Facepile">
                {Array.from(
                  slackData.reactions
                    .filter(validReaction)
                    .reduce((acc, cv) => {
                      cv.users.forEach(user => acc.add(user));
                      return acc;
                    }, new Set()),
                )
                  .sort()
                  .map(user => (
                    <Tooltip
                      title={context.slackUsers.get(user).profile.real_name}
                    >
                      <Avatar
                        src={context.slackUsers.get(user).profile.image_48}
                        size={24}
                      />
                    </Tooltip>
                  ))}
              </div>
            );
          } else {
            return null;
          }
        }}
      </Context.Consumer>
    );
  }
}
