import React, {Fragment} from 'react';
import Tooltip from 'antd/lib/tooltip';
import config from './config';
import {Context} from './Core';
import './Rating.css';
import {SlackReaction} from './api';
import {TableRow} from './Table';

export function _getAverageRating(
  reactions: Array<SlackReaction> = [],
): number | null {
  const validReaction = (reaction: {name: string}) =>
    reaction.name in config.ratings;
  reactions = reactions.filter(validReaction);
  if (reactions.length === 0) {
    return null;
  }
  return (
    reactions.reduce(
      (acc, cv) =>
        acc + cv.count * config.ratings[cv.name as keyof typeof config.ratings],
      0,
    ) / reactions.reduce((acc, cv) => acc + cv.count, 0)
  );
}

export function _getMyRating(
  reactions: Array<SlackReaction> = [],
): number | undefined {
  const myUser = JSON.parse(window.localStorage.getItem('login')!).user_id;
  const reaction = reactions.filter(
    reaction => reaction.users.findIndex(user => user === myUser) > -1,
  );
  if (reaction.length > 0) {
    return config.ratings[reaction[0].name as keyof typeof config.ratings];
  }
}

export default function(props: {record: TableRow}) {
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
