import React from 'react';
import { Layout, Row, Col } from 'antd';
import Sidebar from 'Components/Sidebar';
import SearchBar from 'Components/SearchBar';

import styles from './styles.module.css';

const { Header, Content, Sider } = Layout;

const StaffLayout: React.FunctionComponent = props => {
  return (
    <Layout className={styles.main}>
      {/* sidebar */}
      <Layout>
        <Sider width={250} className={styles.sider}>
          <Sidebar />
        </Sider>

        {/* <Layout style={{ padding: '0 24px 24px' }}> */}
        <Layout>
          <Header className={styles.header}>
            <Row>
              <Col span={16}>
                <SearchBar />
              </Col>
              <Col span={8}>
                <p className={styles.username}>เจ้าที่ 1</p>
              </Col>
            </Row>
          </Header>

          <Content className={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
