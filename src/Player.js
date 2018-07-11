// @flow

import React, {Component} from 'react';
import youtubeUrl from 'youtube-url';
import Spin from 'antd/lib/spin';
import config from './config';
import './Player.css';

type Props = {
  href: string,
};

type State = {
  url: ?string,
  loading: boolean,
};

function youTubeVideo(href: string): Promise<void> {
  if (youtubeUrl.valid(href)) {
    return Promise.reject(
      `https://www.youtube.com/embed/${youtubeUrl.extractId(href)}`,
    );
  }
  return Promise.resolve();
}

function youTubeCustomURL(href: string): Promise<void> {
  // youtube.com/YouTubeCreators
  // youtube.com/c/YouTubeCreators
  // youtube.com/user/YouTubeCreators
  const urlPartRegEx = /youtube\.com\/(c\/|user\/)?([A-Za-z0-9-_.]+)$/i;
  if (urlPartRegEx.test(href)) {
    const match = href.match(urlPartRegEx);
    if (match && match.length > 2) {
      const username = match[2];
      return fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${
          config.googleAPIKey
        }&type=channel&part=id&q=${username}`,
      )
        .then(res => res.json())
        .then(data => {
          if (data && data.items && data.items.length > 0) {
            return youTubeChannel(
              `https://youtube.com/channel/${data.items[0].id.channelId}`,
            );
          } else {
            return Promise.resolve();
          }
        });
    }
  }

  return Promise.resolve();
}

function youTubeChannel(href: string): Promise<void> {
  if (/youtube\.com\/channel/i.test(href)) {
    const match = href.match(/channel\/([A-Za-z0-9-_.]+)/i);
    if (match && match.length > 1) {
      return fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${
          config.googleAPIKey
        }&type=video&channelId=${
          match[1]
        }&part=id&order=viewCount&maxResults=1&videoEmbeddable=true`,
      )
        .then(res => res.json())
        .then(data => {
          if (data && data.items && data.items.length > 0) {
            return Promise.reject(
              `https://www.youtube.com/embed/${data.items[0].id.videoId}`,
            );
          }
        });
    }
  }
  return Promise.resolve();
}

function soundCloudURL(href: string): Promise<void> {
  if (/soundcloud\.com/i.test(href)) {
    return Promise.reject(
      `https://w.soundcloud.com/player/?url=${href}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`,
    );
  }
  return Promise.resolve();
}

function spotifyURL(href: string): Promise<void> {
  if (/spotify\.com/i.test(href)) {
    return Promise.reject(href.replace('spotify.com/', 'spotify.com/embed/'));
  }
  return Promise.resolve();
}

function bandcampURL(href: string): Promise<void> {
  if (/bandcamp\.com/i.test(href)) {
    return fetch('https://cors-anywhere.herokuapp.com/' + href)
      .then(t => t.text())
      .then(html => {
        let match = html.match(/<!-- album id (\d+) -->/);
        if (!match || match.length < 2) {
          match = html.match(/album-(\d+)/);
        }

        if (match && match.length > 1) {
          return Promise.reject(
            `https://bandcamp.com/EmbeddedPlayer/album=${
              match[1]
            }/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/track=4039719937/transparent=true/`,
          );
        } else {
          return Promise.resolve();
        }
      });
  }
  return Promise.resolve();
}

export default class Sidebar extends Component<Props, State> {
  state = {
    url: null,
    loading: true,
  };

  componentDidMount() {
    this.getPlayerURL(this.props.href);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.href !== this.props.href) {
      this.setState({
        url: null,
        loading: true,
      });
      this.getPlayerURL(this.props.href);
    }
  }

  getPlayerURL(href: string) {
    href = href.trim();

    // inverted promises: They reject if they found a result
    Promise.all(
      [
        youTubeVideo,
        youTubeCustomURL,
        youTubeChannel,
        soundCloudURL,
        bandcampURL,
        spotifyURL,
      ].map(f => f(href)),
    )
      .then(url => {
        // nothing matched
        this.setState({url: null, loading: false});
      })
      .catch(url => {
        this.setState({url, loading: false});
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="playerLoading">
          <Spin />
        </div>
      );
    }

    return this.state.url ? (
      <iframe
        title="ytplayer"
        type="text/html"
        width="100%"
        height="242"
        allowtransparency="true"
        allow="encrypted-media"
        frameBorder="0"
        src={this.state.url}
      />
    ) : (
      <p>
        <a href={this.props.href} target="_blank" rel="noopener noreferrer">
          {this.props.href}
        </a>
      </p>
    );
  }
}
