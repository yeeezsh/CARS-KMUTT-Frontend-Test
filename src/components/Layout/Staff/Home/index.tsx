import { Layout, Row } from 'antd';
import SearchBar from 'Components/SearchBar';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootReducersType } from 'store/reducers';
import styles from './styles.module.css';

const { Header } = Layout;

const StaffLayout: React.FunctionComponent = props => {
  const username = useSelector(
    (s: RootReducersType) => s.UserReducers.username,
  );
  return (
    <Layout>
      <Header className={styles.header}>
        <Row>
          <div style={{ width: 400 }}>
            <SearchBar />
          </div>
          <p className={styles.username}>{username}</p>
        </Row>
      </Header>

      <div className={styles.content}>{props.children}</div>
    </Layout>
  );
};

export default StaffLayout;
