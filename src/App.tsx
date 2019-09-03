import React, {Component} from 'react';
import qs from 'query-string';
import Core from './Core';
import config from './config';
import './App.css';

export type OAuthSuccess = {
  ok: true;
  access_token: string;
  scope: string;
  user: {
    name: string;
    id: string;
  };
  team: {id: string};
};

class App extends Component<{}> {
  componentDidMount() {
    const {code} = qs.parse(window.location.search);
    if (code) {
      fetch(
        `https://slack.com/api/oauth.access?client_id=${
          config.slackClientID
        }&client_secret=${config.slackClientSecret}&code=${code}&redirect_uri=${
          window.location.origin
        }`,
      )
        .then(res => res.json())
        .then((data: OAuthSuccess | {ok: false}) => {
          if (data && data.ok) {
            window.localStorage.setItem('login', JSON.stringify(data));
          } else {
            window.localStorage.clear();
          }
          window.location.search = '';
          setTimeout(window.location.reload, 500);
        });
    }
  }

  render() {
    const loginString = window.localStorage.getItem('login');
    let data: OAuthSuccess | undefined;
    if (loginString) {
      data = JSON.parse(loginString);
    }
    return (
      <div className="App">
        {data ? (
          <Core />
        ) : (
          <a
            href={`https://slack.com/oauth/authorize?&client_id=3495902661.230881084770&scope=channels:history,reactions:write,chat:write:user,users:read&redirect_uri=${
              window.location.origin
            }`}
            className="loginButton"
          >
            <img
              alt="Login with Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
        )}
      </div>
    );
  }
}

export default App;
