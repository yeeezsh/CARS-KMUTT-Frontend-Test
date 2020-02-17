import React from 'react';
import { Layout, Row, Col } from 'antd';
import Sidebar from 'Components/Sidebar';
import SearchBar from 'Components/SearchBar';

import styles from './styles.module.css';

const { Header } = Layout;

const StaffLayout: React.FunctionComponent = props => {
  return (
    <Layout>
      <Header className={styles.header}>
        <Row>
          <Col span={12}>
            <SearchBar />
          </Col>
          <Col span={3}>
            <p className={styles.username}>เจ้าที่ 1</p>
          </Col>
        </Row>
      </Header>

      <div className={styles.content}>{props.children}</div>
    </Layout>
  );
};

export default StaffLayout;
