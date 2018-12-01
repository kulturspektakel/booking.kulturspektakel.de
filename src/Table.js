// @flow
import type {TableRow} from './Core.js';

import React, {Component} from 'react';
import Table from 'antd/lib/table';
import Rate from 'antd/lib/rate';
import Tooltip from 'antd/lib/tooltip';
import Rating from './Rating.js';
import Facepile from './Facepile.js';
import config from './config.js';
import './Table.css';

const COLUMNS = [
  {
    title: '',
    dataIndex: 'musikrichtung',
    filters: Object.keys(config.genres).map(g => ({text: g, value: g})),
    onFilter: (value, record) => record.musikrichtung === value,
    render: (musikrichtung, record) => (
      <Tooltip title={musikrichtung} placement="right">
        <img src={config.genres[musikrichtung]} alt={musikrichtung} />
      </Tooltip>
    ),
    width: 40,
  },
  {
    title: 'Name',
    dataIndex: 'bandname',
    sorter: (a, b) =>
      a.bandname.toLowerCase() > b.bandname.toLowerCase()
        ? -1
        : a.bandname.toLowerCase() < b.bandname.toLowerCase()
          ? 1
          : 0,
    render: (title, record) => (
      <div>
        <strong>{title}</strong>
        <br />
        {record.genre || <span>&nbsp;</span>}
      </div>
    ),
  },
  {
    title: 'Likes',
    dataIndex: 'likes',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.likes - b.likes,
    width: 100,
  },
  {
    title: 'Ort',
    dataIndex: 'entfernung',
    filters: [
      {
        text: 'Würmtal',
        value: 'aus dem Würmtal',
      },
      {
        text: 'München/Umland',
        value: 'aus München/dem Münchner Umland',
      },
      {
        text: 'Bayern',
        value: 'aus Bayern',
      },
      {
        text: 'Deutschland',
        value: 'aus Deutschland',
      },
      {
        text: 'Ausland',
        value: 'aus dem Ausland',
      },
    ],
    onFilter: (value, record) => record.anreise === value,
    sorter: (a, b) => parseInt(a.entfernung, 10) - parseInt(b.entfernung, 10),
    render: (_, record) => (
      <span>
        {record.wohnort}
        {record.entfernung && ` (${record.entfernung}km)`}
      </span>
    ),
    width: 300,
  },
  {
    title: 'Bewertung',
    dataIndex: 'myRating',
    render: (myRating, record) => (
      <Rate
        value={myRating}
        count={4}
        onChange={record.onRate}
        style={{color: '#4795F7'}}
      />
    ),
    filters: [
      {
        text: '4 Sterne',
        value: 4,
      },
      {
        text: '3 Sterne',
        value: 3,
      },
      {
        text: '2 Sterne',
        value: 2,
      },
      {
        text: '1 Stern',
        value: 1,
      },
      {
        text: 'nicht bewertet',
        value: 0,
      },
    ],
    onFilter: (value, record) => {
      value = value === '0' ? undefined : parseInt(value, 10);
      return record.myRating === value;
    },
    sorter: (a, b) => a.myRating || 0 - b.myRating || 0,
    width: 140,
  },
  {
    title: 'Schnitt',
    dataIndex: 'rating',
    render: (rating, record) => <Rating record={record} />,
    filters: [
      {
        text: '4 Sterne',
        value: 4,
      },
      {
        text: '3 Sterne',
        value: 3,
      },
      {
        text: '2 Sterne',
        value: 2,
      },
      {
        text: '1 Stern',
        value: 1,
      },
    ],
    onFilter: (value, record) =>
      record.rating >= value && record.rating < value + 1,
    sorter: (a, b) => a.rating - b.rating,
    width: 120,
  },
  {
    title: 'Bewertet',
    dataIndex: '',
    render: (rating, record) => <Facepile record={record} />,
    width: 120,
  },
];

type Props = {
  data: Array<TableRow>,
  onSelect: (t: TableRow) => void,
};

type State = {};

class TableComponent extends Component<Props, State> {
  render() {
    return (
      <Table
        bordered
        dataSource={this.props.data}
        pagination={false}
        size="small"
        columns={COLUMNS}
        rowKey={record => `${record.name}${record.timestamp}`}
        onRow={(t: TableRow) => ({
          onClick: e => {
            if (e.target.nodeName === 'path') {
              e.stopPropagation();
              return;
            }
            this.props.onSelect(t);
          },
        })}
      />
    );
  }
}

export default TableComponent;
