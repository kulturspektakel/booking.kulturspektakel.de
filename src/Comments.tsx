import React, {Component} from 'react';
import Input from 'antd/lib/input';
import './Comments.css';
import config from './config';

import {TableRow} from './Core';
import {SlackUser} from './Core.js';

type Props = {
  record: TableRow;
  myUser: SlackUser;
};

type State = {
  message: string;
  loading: boolean;
};

class Comments extends Component<Props, State> {
  state = {
    message: '',
    loading: false,
  };

  _onComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const comment = this.state.message;

    this.setState({
      loading: true,
    });

    const {slackData} = this.props.record;
    if (slackData) {
      const message = {
        ts: String(new Date().getTime() / 1000),
        text: comment,
        user: this.props.myUser,
      };

      if (slackData.replies) {
        slackData.replies.push(message);
      } else {
        slackData.replies = [message];
      }
      return fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: `token=${
          JSON.parse(window.localStorage.getItem('login') || '').access_token
        }&channel=${
          config.slackChannel
        }&as_user=true&text=${comment}&thread_ts=${slackData.ts}`,
      })
        .then(res => res.json())
        .then(_ =>
          this.setState({
            message: '',
            loading: false,
          }),
        );
    }
  };

  render() {
    const {record} = this.props;
    return (
      <div>
        {record.slackData &&
          (record.slackData.replies || []).map(({ts, text, user}) => (
            <div key={ts} className="message">
              <h4>{typeof user === 'string' ? user : user.real_name}</h4>
              {text}
            </div>
          ))}
        <Input.TextArea
          autosize={{minRows: 2, maxRows: 6}}
          disabled={this.state.loading}
          onChange={e => this.setState({message: e.target.value})}
          onPressEnter={this._onComment}
          value={this.state.message}
          placeholder="Kommentar schreiben..."
        />
      </div>
    );
  }
}

export default Comments;
