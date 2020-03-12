import React from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from 'Components/Sidebar';

import styles from './styles.module.css';
import Layout from 'antd/lib/layout/layout';

const { Sider } = AntLayout;

const StaffSiderLayout: React.FC = () => {
  return (
    <Layout className={styles.main}>
      <Sider width={250} className={styles.sider}>
        <Sidebar />
      </Sider>
    </Layout>
  );
};

export default StaffSiderLayout;
