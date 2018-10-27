// @flow
import React, {Component} from 'react';

type Props = {
  children: string,
  limit: number,
};

type State = {
  more: boolean,
};

class ShowMore extends Component<Props, State> {
  static defaultProps = {
    limit: 500,
  };
  state = {
    more: false,
  };

  componentWillReceiveProps() {
    this.setState({more: false});
  }

  render() {
    return this.state.more ||
      this.props.children.length <= this.props.limit + 20 ? (
      <span>{this.props.children}</span>
    ) : (
      <div>
        {this.props.children.substr(0, this.props.limit)}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        ... <a onClick={() => this.setState({more: true})}>→&nbsp;mehr</a>
      </div>
    );
  }
}

export default ShowMore;
