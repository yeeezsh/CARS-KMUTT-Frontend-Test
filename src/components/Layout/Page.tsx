import React, { Component, Props as PageProps } from 'react';
import { Row, Col, Drawer } from 'antd';
import styles from './page.module.css';
import hamburgerOrange from '../../assets/icons/hamburger-orange.svg';
import AppDrawer from '../AppDrawer';

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
