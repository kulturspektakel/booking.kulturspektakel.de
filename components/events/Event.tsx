import React from 'react';

import {gql} from '@apollo/client';
import {EventDetailsFragment} from '../../types/graphql';
import DateString from '../DateString';

gql`
  fragment EventDetails on Event {
    name
    start
    end
    description
  }
`;

export default function Event(props: EventDetailsFragment) {
  return (
    <li>
      <h3>{props.name}</h3>
      <DateString date={props.start} to={props.end} />
      <p>{props.description}</p>
    </li>
  );
}
