// @flow
import React, {Component} from 'react';
import Spin from 'antd/lib/spin';

const DISTANCE_API =
  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Gauting,Deutschland&key=AIzaSyBWFWELEspeAWJrESCocEqpffIx1m9ErQM&destinations=';

type Props = {
  location: string,
};

type State = {
  distance?: number,
};

class Distance extends Component<Props, State> {
  state = {};

  componentDidMount() {
    fetch(DISTANCE_API + this.props.location)
      .then(res => res.json())
      .then(data => {
        this.setState({
          distance: data.rows[0].elements[0].distance.value,
        });
      });
  }

  render() {
    return this.state.distance ? (
      <span> ({parseInt(this.state.distance / 1000, 10)}&nbsp;km)</span>
    ) : (
      <span>
        &nbsp;<Spin size="small" />
      </span>
    );
  }
}

export default Distance;
