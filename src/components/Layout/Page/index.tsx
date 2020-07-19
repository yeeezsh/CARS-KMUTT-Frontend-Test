import { Col, Row } from 'antd';
import React, { Component } from 'react';
import styles from './page.module.css';

export default class PageLayout extends Component<{
  titile: string;
}> {
  render() {
    return (
      <Row>
        {/* header */}
        <Row type="flex" justify="center" className={styles.header}>
          <Col className={styles.title} span={12}>
            <p className={styles.orange}>{this.props.titile}</p>
          </Col>
        </Row>

        {/* content */}
        <Row style={{ marginTop: 75 }} type="flex" justify="center">
          {React.Children.map(this.props.children, child => (
            <Col span={22}>{child}</Col>
          ))}
        </Row>
      </Row>
    );
  }
}
