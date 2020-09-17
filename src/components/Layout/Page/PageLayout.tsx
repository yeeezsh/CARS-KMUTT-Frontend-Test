import { Col, Row } from 'antd';
import useWindowResize from 'Hooks/use.windows.resize';
import React from 'react';
import styles from './page.module.css';

const PageLayout: React.FC<{ title: string }> = props => {
  const width = useWindowResize();
  console.log(width);
  return (
    <Row>
      {/* hotfix background */}
      <Row
        style={{
          backgroundColor: 'white',
          zIndex: 1,
          width: width.width,
          height: '190px',
          position: 'fixed',
        }}
      />

      {/* header */}
      <Row type="flex" justify="center">
        <div className={styles.header}>
          <Col className={styles.title} span={20}>
            <p className={styles.orange}>{props.title}</p>
          </Col>
        </div>
      </Row>

      {/* content */}
      <Row style={{ marginTop: 75 }} type="flex" justify="center">
        {React.Children.map(props.children, child => (
          <Col span={22}>{child}</Col>
        ))}
      </Row>
    </Row>
  );
};

export default PageLayout;
