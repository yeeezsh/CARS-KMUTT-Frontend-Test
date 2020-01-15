import React, { Component } from 'react';
import { Row, Col, Input, Form } from 'antd';
import Button from '../../components/Button';

import { FormComponentProps } from 'antd/lib/form';

import logo from '../../assets/logo.login.svg';
import styles from './styles.module.css';

import { RequestorLogin } from '../../models/user/';

class LoginPage extends Component<FormComponentProps, {}> {
  onValidator = (rule: any, value: string, callback: any) => {
    if (value === undefined) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');
    if (value.length !== 11) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');
    return callback();
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    console.log('on login');
    const { validateFields } = this.props.form;
    return validateFields(async (err, values: { username: string; password: string }) => {
      if (!err) {
        const { username, password } = values;
        const res = await RequestorLogin(username, password);
        console.log(res);
      }
    });
  };

  onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value;
    const key = e.target.id;

    return this.props.form.setFields({
      [key]: {
        error: undefined,
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div style={{ height: '150px' }} />
        <Row type="flex" justify="center">
          <Col>
            <img src={logo} alt="logo" />
          </Col>
          <Col span={20}>
            <p className={styles.label}>common area reservation systems</p>
          </Col>
        </Row>
        <div style={{ height: '80px' }} />
        <Form onSubmit={this.onSubmit}>
          <Row type="flex" justify="center">
            <Col span={18} lg={14} className={styles.input}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      max: 11,
                      validator: this.onValidator,
                    },
                  ],
                  validateTrigger: ['onBlur'],
                })(<Input onChange={this.onType} placeholder="Username" pattern="[0-9]*" type="number" />)}
              </Form.Item>
            </Col>
            <Col span={18} lg={14} className={styles.input}>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'โปรดกรอกรหัสผ่าน' }],
                  validateTrigger: ['onBlur'],
                })(<Input onChange={this.onType} placeholder="Password" type="password" />)}
              </Form.Item>
            </Col>
            <Col span={18} lg={14}>
              <Button>Login</Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const wrapped = Form.create()(LoginPage);
export default wrapped;
