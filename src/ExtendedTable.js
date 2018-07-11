// @flow
import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Distance from './Distance';
import Facebook from './Facebook';
import ReactPlayer from 'react-player';
import ShowMore from './ShowMore';

import type {TableRow} from './App.js';

export default (record: TableRow) => {
  return (
    <div>
      <Row gutter={24}>
        <Col span={12}>
          {record.connection && (
            <div>
              <Card noHovering title="Woher kennt ihr das Kult?">
                {record.connection}
              </Card>
              <br />
            </div>
          )}
          <Card noHovering title="Bandbeschreibung">
            <ShowMore>{record.description}</ShowMore>
          </Card>
        </Col>
        <Col span={12}>
          <Card noHovering title="Infos">
            <label>Webseite:</label>{' '}
            <a target="_blank" href={record.website}>
              {record.website}
            </a>
            <br />
            <label>Kontakt:</label> {record.contact}
            <br />
            {record.facebook && (
              <div>
                <label>Facebook:</label> <Facebook facebook={record.facebook} />
              </div>
            )}
            <label>Wohnort:</label> {record.location}
            <Distance location={record.location} />
          </Card>
          <br />
          <Card
            title="Demo"
            noHovering
            bodyStyle={{padding: 0}}
            extra={
              <a href={record.demo} target="_blank">
                öffnen
              </a>
            }
          >
            <ReactPlayer url={record.demo} width="100%" controls />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
