import React from 'react';
import { Layout } from 'antd';
import Sidebar from 'Components/Sidebar';

const { Header, Content, Sider } = Layout;

const StaffLayout: React.FunctionComponent = props => {
  return (
    <Layout
      style={{ height: '100%', width: '100%', position: 'absolute' }}
    >
      {/* sidebar */}
      <Layout>
        <Sider
          width={250}
          style={{ background: '#FF682B', minHeight: '100%' }}
        >
          <Sidebar />
        </Sider>

        {/* <Layout style={{ padding: '0 24px 24px' }}> */}
        <Layout>
          <Header>header ja</Header>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
