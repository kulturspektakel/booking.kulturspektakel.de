// @flow

import React from 'react';
import Checkbox from 'antd/lib/checkbox';
import Tooltip from 'antd/lib/tooltip';
import config from './config';
import {Context} from './Core';
import './Rating.css';

import type {TableRow} from './Core';

type Props = {
  record: TableRow,
};

export default function({record}: Props) {
  const contacted = record.slackData
    ? (record.slackData.reactions || []).findIndex(
        r => r.name === config.contactedEmoji,
      )
    : -1;

  const checked = contacted > -1;

  const user = checked ? record.slackData.reactions[contacted].users[0] : null;

  const checkbox = (
    <Checkbox checked={checked} onChange={record.onToggleContacted} />
  );

  return (
    <div style={{textAlign: 'center'}}>
      <Context.Consumer>
        {context =>
          checked ? (
            <Tooltip
              placement="left"
              title={context.slackUsers.get(user).real_name}
            >
              {checkbox}
            </Tooltip>
          ) : (
            checkbox
          )
        }
      </Context.Consumer>
    </div>
  );
}
