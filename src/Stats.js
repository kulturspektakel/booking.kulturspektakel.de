// @flow
import React, {Component} from 'react';
import {Modal} from 'antd';

import type {TableRow, SlackUser} from './Core';

type Props = {|
  visible: boolean,
  onHide: () => void,
  data: ?Array<TableRow>,
  slackUsers: Map<string, SlackUser>,
  myUserId: ?string,
|};

type State = {|
  visible: boolean,
|};

export default class Head extends Component<Props, State> {
  state = {visible: false};

  render() {
    return (
      <Modal
        title="Statistiken"
        footer={null}
        visible={this.props.visible}
        onCancel={this.props.onHide}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
