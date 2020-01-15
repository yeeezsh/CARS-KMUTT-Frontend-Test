import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import Button from '../../components/Button';

import logo from '../../assets/logo.login.svg';
import styles from './styles.module.css';

export default class LoginPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ height: '120px' }} />
        <Row type="flex" justify="center">
          <Col>
            <img src={logo} alt="logo" />
          </Col>
          <Col span={20}>
            <p className={styles.label}>common area reservation systems</p>
          </Col>
        </Row>
        <div style={{ height: '80px' }} />
        <Row type="flex" justify="center">
          <Col span={18} lg={14} className={styles.input}>
            <Input placeholder="Username" />
          </Col>
          <Col span={18} lg={14} className={styles.input}>
            <Input placeholder="Password" />
          </Col>
          <Col span={18} lg={14}>
            <Button>Login</Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
