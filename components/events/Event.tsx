import React from 'react';

import {gql} from '@apollo/client';
import {EventDetailsFragment} from '../../types/graphql';

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
      {props.start.toLocaleDateString('de-DE')} bis{' '}
      {props.end.toLocaleDateString('de-DE')}
      <p>{props.description}</p>
    </li>
  );
}
