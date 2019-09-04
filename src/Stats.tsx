import React, {Component} from 'react';
import {Modal} from 'antd';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import {Context} from './Core';
import config from './config';
import './Stats.css';
import {SlackUser} from './api';
import {TableRow} from './Table';

type Props = {
  visible: boolean;
  onHide: () => void;
  data: Array<TableRow>;
  slackUsers: Map<string, SlackUser>;
  myUserId: string | null;
};

type State = {
  visible: boolean;
  perDay: Array<{key: string; value: number}>;
  perGenre: Array<{key: string; value: number}>;
  myRatings: Array<{key: string; value: number}>;
  topUsers: Array<{key: string; value: number}>;
};

const COLORS = [
  '#1F2F65',
  '#7087FE',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#CC5147',
  '#FE5BA5',
  '#B877CF',
];

export default class Stats extends Component<Props, State> {
  static defaultProps = {
    data: [],
  };
  state: State = {
    visible: false,
    perDay: this.getPerDay(),
    perGenre: this.getPerGenre(),
    myRatings: this.getMyRatings(),
    topUsers: this.getTopUsers(),
  };

  getPerDay() {
    const d = this.props.data
      .map((t: TableRow) =>
        t.timestamp
          .split(' ')[0]
          .split('.')
          .reverse()
          .join('-'),
      )
      .sort();

    const numDays =
      Math.ceil(
        (new Date(d[d.length - 1]).getTime() - new Date(d[0]).getTime()) /
          86400000,
      ) + 1;
    const days: {
      [key: string]: number;
    } = {};
    for (let i = 0; i < numDays; i++) {
      days[
        new Date(new Date(d[0]).getTime() + 86400000 * i)
          .toISOString()
          .split('T')[0]
      ] = 0;
    }
    const dates = d.reduce<{[key: string]: number}>((acc, cv) => {
      acc[cv] += 1;
      return acc;
    }, days);

    return Object.keys(dates).map((key: string) => ({
      key,
      value: dates[key],
    }));
  }

  getPerGenre() {
    const a = this.props.data.reduce<{[key: string]: number}>((acc, cv) => {
      if (!acc[cv.musikrichtung]) {
        acc[cv.musikrichtung] = 1;
      } else {
        acc[cv.musikrichtung] += 1;
      }
      return acc;
    }, {});

    return Object.keys(a).map(key => ({key, value: a[key]}));
  }

  getMyRatings() {
    const reverseLookup = (Object.keys(config.ratings) as Array<
      keyof typeof config.ratings
    >).reduce<{
      [key: string]: string;
    }>((acc, cv) => {
      acc[config.ratings[cv]] = cv;
      return acc;
    }, {});

    const a = this.props.data.reduce(
      (acc: any, cv) => {
        acc[cv.myRating ? reverseLookup[cv.myRating] : 'unbewertet'] += 1;
        return acc;
      },
      Object.keys(config.ratings).reduce(
        (acc: any, cv) => {
          acc[String(cv)] = 0;
          return acc;
        },
        {unbewertet: 0},
      ),
    );

    return Object.keys(a).map(key => ({
      key: config.stars[(config.ratings as any)[key]] || 'unbewertet',
      value: a[key],
    }));
  }

  getTopUsers() {
    const validReaction = (reaction: {name: string}) =>
      reaction.name in config.ratings;

    const a = this.props.data.reduce((acc: any, cv) => {
      if (cv.slackData && cv.slackData.reactions) {
        cv.slackData.reactions.filter(validReaction).forEach(r => {
          r.users.forEach(u => {
            acc[u] = (acc[u] || 0) + 1;
          });
        });
      }

      return acc;
    }, {});

    return Object.keys(a).map(key => ({key, value: a[key]}));
  }

  render() {
    const {perDay, perGenre, myRatings, topUsers} = this.state;

    return (
      <Modal
        title="Statistiken"
        footer={null}
        visible={this.props.visible}
        onCancel={this.props.onHide}
      >
        <h4>Bewerbungen pro Tag</h4>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={perDay}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#368AF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#368AF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Tooltip
              labelFormatter={(i: any) => (
                <div>
                  {perDay[i].key
                    .split('-')
                    .reverse()
                    .join('.')}
                </div>
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
        <h4>Bewerbungen pro Genre</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={250} height={250}>
            <Pie
              data={perGenre}
              dataKey="value"
              nameKey="key"
              cx="50%"
              cy="50%"
              fill="#8884d8"
              label={({value}) =>
                `${Math.floor((value / (this.props.data || []).length) * 100)}%`
              }
            >
              {perGenre.map((_entry, i) => (
                <Cell fill={COLORS[i % COLORS.length]} key={i} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>

        <h4>Meiste Bewertungen</h4>
        <Context.Consumer>
          {context => (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                height={250}
                data={topUsers.map(({key, value}) => ({
                  key: context.slackUsers.get(key)!.profile.real_name,
                  value,
                }))}
              >
                <YAxis dataKey="key" type="category" />
                <XAxis type="number" />
                <Bar dataKey="value" fill="#5996F0" />
                <Tooltip cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Context.Consumer>

        <h4>Meine Bewertungen</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart height={250} data={myRatings}>
            <XAxis dataKey="key" />
            <Bar dataKey="value" fill="#5996F0" />
            <Tooltip cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      </Modal>
    );
  }
}
