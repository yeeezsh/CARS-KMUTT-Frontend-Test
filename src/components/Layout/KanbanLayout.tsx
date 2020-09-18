import { Col, Row } from 'antd';
import React from 'react';
import Outline from '../Outline';
import PageLayout from './Page/PageLayout';

const KanBanLayout: React.FunctionComponent<{
  title?: string;
  outline?: string;
}> = props => (
  <React.Fragment>
    <PageLayout title={props.title || ''}>
      {/* spacing */}
      <div style={{ height: 30 }}></div>

      {/* outliner */}
      <Col span={24}>
        <Row type="flex" justify="start">
          <Outline>{props.outline || ''}</Outline>
        </Row>
      </Col>

      {/* child */}
      {props.children}
    </PageLayout>
  </React.Fragment>
);

export default KanBanLayout;
