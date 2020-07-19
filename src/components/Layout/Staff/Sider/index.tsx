import { Layout as AntLayout } from 'antd';
import Layout from 'antd/lib/layout/layout';
import Sidebar from 'Components/Sidebar';
import React from 'react';
import styles from './styles.module.css';

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
