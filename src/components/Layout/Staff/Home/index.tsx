import React from 'react';
import { Layout, Row } from 'antd';
import SearchBar from 'Components/SearchBar';

import styles from './styles.module.css';

const { Header } = Layout;

const StaffLayout: React.FunctionComponent = props => {
  return (
    <Layout>
      <Header className={styles.header}>
        <Row>
          <div style={{ width: 400 }}>
            <SearchBar />
          </div>
          <p className={styles.username}>เจ้าที่ 1</p>
        </Row>
      </Header>

      <div className={styles.content}>{props.children}</div>
    </Layout>
  );
};

export default StaffLayout;
