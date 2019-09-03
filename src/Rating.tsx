import React, {Fragment} from 'react';
import Tooltip from 'antd/lib/tooltip';
import config from './config';
import {Context, SlackReaction} from './Core';
import './Rating.css';

import {TableRow} from './Core';

type Props = {
  record: TableRow;
};

export default function(props: Props) {
  return (
    <div className={`Rating ${props.record.myRating ? 'rated' : ''}`}>
      {!props.record.myRating ? (
        'n/a'
      ) : (
        <Context.Consumer>
          {context => (
            <Tooltip
              title={
                <Fragment>
                  {props.record.slackData
                    ? (props.record.slackData.reactions || [])
                        .map((r: SlackReaction) => ({
                          ...r,
                          rating:
                            config.ratings[
                              r.name as keyof typeof config.ratings
                            ],
                        }))
                        .filter(r => Boolean(r.rating))
                        .reduce((acc: string[], cv) => {
                          cv.users.forEach(u => {
                            acc.push(
                              `${config.stars[cv.rating]} ${
                                context.slackUsers.get(u)!.real_name
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
              {(props.record.rating || 0).toFixed(1)}
            </Tooltip>
          )}
        </Context.Consumer>
      )}
    </div>
  );
}
