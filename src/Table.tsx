import {TableRow} from './Core';
import React, {PureComponent} from 'react';
import Table from 'antd/lib/table';
import Rate from 'antd/lib/rate';
import Tooltip from 'antd/lib/tooltip';
import Rating from './Rating';
import Facepile from './Facepile';
import Contacted from './Contacted';
import config from './config';
import './Table.css';

const COLUMNS = [
  {
    title: '',
    dataIndex: 'musikrichtung',
    filters: Object.keys(config.genres).map(g => ({text: g, value: g})),
    onFilter: (value: string, TableRow: TableRow) =>
      TableRow.musikrichtung === value,
    render: (musikrichtung: keyof typeof config.genres, _record: TableRow) => (
      <Tooltip title={musikrichtung} placement="right">
        <img src={config.genres[musikrichtung]} alt={musikrichtung} />
      </Tooltip>
    ),
    width: 40,
  },
  {
    title: 'Name',
    dataIndex: 'bandname',
    sorter: (a: TableRow, b: TableRow) =>
      a.bandname.toLowerCase() > b.bandname.toLowerCase()
        ? -1
        : a.bandname.toLowerCase() < b.bandname.toLowerCase()
          ? 1
          : 0,
    render: (title: string, TableRow: any) => (
      <div>
        <strong>{title}</strong>
        <br />
        {TableRow.genre || <span>&nbsp;</span>}
      </div>
    ),
  },
  {
    title: 'Likes',
    dataIndex: 'likes',
    sorter: (a: TableRow, b: TableRow) =>
      parseInt(a.likes, 10) - parseInt(b.likes, 10),
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
    onFilter: (value: string, TableRow: any) => TableRow.anreise === value,
    sorter: (a: TableRow, b: TableRow) =>
      parseInt(a.entfernung, 10) - parseInt(b.entfernung, 10),
    render: (_: any, TableRow: any) => (
      <span>
        {TableRow.wohnort}
        {TableRow.entfernung && ` (${TableRow.entfernung}km)`}
      </span>
    ),
    width: 300,
  },
  {
    title: 'Bewertung',
    dataIndex: 'myRating',
    render: (myRating: number | undefined, TableRow: any) => (
      <Rate
        value={myRating}
        count={4}
        onChange={TableRow.onRate}
        style={{color: '#4795F7'}}
      />
    ),
    filters: [
      {
        text: '4 Sterne',
        value: '4',
      },
      {
        text: '3 Sterne',
        value: '3',
      },
      {
        text: '2 Sterne',
        value: '2',
      },
      {
        text: '1 Stern',
        value: '1',
      },
      {
        text: 'nicht bewertet',
        value: '0',
      },
    ],
    onFilter: (value: string, TableRow: TableRow) => {
      const v = value === '0' ? undefined : parseInt(value, 10);
      return TableRow.myRating === v;
    },
    sorter: (a: TableRow, b: TableRow) => (a.myRating || 0) - (b.myRating || 0),
    width: 140,
  },
  {
    title: 'Schnitt',
    dataIndex: 'rating',
    render: (_rating: number, record: TableRow) => <Rating record={record} />,
    filters: [
      {
        text: '4 Sterne',
        value: '4',
      },
      {
        text: '3 Sterne',
        value: '3',
      },
      {
        text: '2 Sterne',
        value: '2',
      },
      {
        text: '1 Stern',
        value: '1',
      },
    ],
    onFilter: (value: string, record: TableRow) => {
      const v = parseInt(value, 10);
      const rating = record.rating || -1;
      return rating >= v && rating < v + 1;
    },
    sorter: (a: TableRow, b: TableRow) => (a.rating || -1) - (b.rating || -1),
    width: 120,
  },
  {
    title: 'Bewertet',
    dataIndex: '',
    render: (_: string, record: TableRow) => <Facepile record={record} />,
    width: 120,
  },
  {
    title: 'Kontakt',
    dataIndex: '',
    render: (_: string, record: TableRow) => <Contacted record={record} />,
    width: 75,
  },
];

type Props = {
  data: Array<TableRow>;
  onSelect: (t: TableRow) => void;
};

class TableComponent extends PureComponent<Props> {
  _onRow = (t: TableRow) => ({
    onClick: (e: React.SyntheticEvent<Element, Event>) => {
      if (
        (e.target as HTMLElement).nodeName === 'path' ||
        (e.target as HTMLElement).nodeName === 'INPUT'
      ) {
        e.stopPropagation();
        return;
      }
      this.props.onSelect(t);
    },
  });

  render() {
    return (
      <Table
        bordered
        dataSource={this.props.data}
        pagination={false}
        size="small"
        columns={COLUMNS}
        rowKey={TableRow => `${TableRow.name}${TableRow.timestamp}`}
        onRow={this._onRow}
      />
    );
  }
}

export default TableComponent;
