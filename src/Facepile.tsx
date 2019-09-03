import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import Avatar from 'antd/lib/avatar';
import config from './config';
import {Context} from './Core';
import './Facepile.css';

import {TableRow} from './Core';

type Props = {
  record: TableRow;
};

export default function(props: Props) {
  return (
    <Context.Consumer>
      {context => {
        const {slackData} = props.record;

        if (slackData && slackData.reactions) {
          const validReaction = (reaction: {name: string}) =>
            reaction.name in config.ratings;

          return (
            <div className="Facepile">
              {Array.from<string>(
                slackData.reactions.filter(validReaction).reduce((acc, cv) => {
                  cv.users.forEach(user => acc.add(user));
                  return acc;
                }, new Set<string>()),
              )
                .sort()
                .map(user => (
                  <Tooltip
                    key={user}
                    title={context.slackUsers.get(user)!.profile.real_name}
                  >
                    <Avatar
                      src={context.slackUsers.get(user)!.profile.image_48}
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
