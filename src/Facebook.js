// @flow
import React, {Component} from 'react';
import Spin from 'antd/lib/spin';

type Props = {
  facebook: string,
};

type State = {
  likes?: number,
};

class Facebook extends Component<Props, State> {
  state = {};

  componentDidMount() {
    const matches = this.props.facebook.match(/.com\/([A-Za-z0-9-_]*)/);
    const self = this;
    if (matches && matches.length > 0) {
      window.FB.getLoginStatus(response => {
        const getData = () =>
          window.FB.api(
            '/' + matches[1],
            'GET',
            {fields: 'fan_count'},
            response => self.setState({likes: response.fan_count}),
          );

        if (response.status === 'connected') {
          getData();
        } else {
          console.log('👩‍👦‍👦', response.status);
          window.FB.login(getData);
        }
      });
    }
  }

  render() {
    return this.state.likes ? (
      <span>
        <a target="_blank" href={this.props.facebook}>
          {
            this.props.facebook
              .split('.com/')[1]
              .replace('/', '')
              .split('?')[0]
          }
        </a>{' '}
        ({this.state.likes}&nbsp;Likes)
      </span>
    ) : (
      <span>
        &nbsp;<Spin size="small" />
      </span>
    );
  }
}

export default Facebook;
