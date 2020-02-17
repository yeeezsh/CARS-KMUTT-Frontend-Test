import React from 'react';
import { Layout as div } from 'antd';
import Sidebar from 'Components/Sidebar';

import styles from './styles.module.css';
import Layout from 'antd/lib/layout/layout';

const { Sider } = div;

const StaffSiderLayout: React.FC = props => {
  return (
    <Layout className={styles.main}>
      <Sider width={250} className={styles.sider}>
        <Sidebar />
      </Sider>
    </Layout>
  );
};

export default StaffSiderLayout;
