import React from 'react';
import { Layout } from 'antd';
import Sidebar from 'Components/Sidebar';

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
          <Header>header ja</Header>
          <Content className={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
