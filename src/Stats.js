// @flow
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
} from 'recharts';

import './Stats.css';

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
  perDay: Array<{key: string, value: string}>,
  perGenre: Array<{key: string, value: string}>,
|};

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#CC5147',
  '#383E4B',
];

export default class Stats extends Component<Props, State> {
  state = {visible: false, perDay: [], perGenre: []};

  componentDidMount() {
    this.setState({
      perDay: this.getPerDay(),
      perGenre: this.getPerGenre(),
    });
  }

  getPerDay() {
    if (!this.props.data) {
      return;
    }
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
      Math.ceil((new Date(d[d.length - 1]) - new Date(d[0])) / 86400000) + 1;
    const days = {};
    for (let i = 0; i < numDays; i++) {
      days[
        new Date(new Date(d[0]).getTime() + 86400000 * i)
          .toISOString()
          .split('T')[0]
      ] = 0;
    }
    const dates = d.reduce((acc, cv) => {
      acc[cv] += 1;
      return acc;
    }, days);

    return Object.keys(dates).map((key: string) => ({
      key,
      value: dates[key],
    }));
  }

  getPerGenre() {
    const a = this.props.data.reduce((acc, cv) => {
      if (!acc[cv.musikrichtung]) {
        acc[cv.musikrichtung] = 1;
      } else {
        acc[cv.musikrichtung] += 1;
      }
      return acc;
    }, {});

    return Object.keys(a).map(key => ({key, value: a[key]}));
  }

  render() {
    const {perDay, perGenre} = this.state;

    console.log(perGenre);

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
              labelFormatter={i => (
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
              innerRaduis={80}
            >
              {perGenre.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Modal>
    );
  }
}
