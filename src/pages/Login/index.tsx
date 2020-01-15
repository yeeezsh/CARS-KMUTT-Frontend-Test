import React, { Component } from 'react';
import { Row, Col, Input, Form, Icon } from 'antd';
import Button from '../../components/Button';

import { FormComponentProps } from 'antd/lib/form';

import logo from '../../assets/logo.login.svg';
import styles from './styles.module.css';

import { RequestorLogin } from '../../models/user/';

class LoginPage extends Component<
  FormComponentProps,
  {
    loading: boolean;
    auth: boolean;
  }
> {
  state = {
    auth: false,
    loading: false,
  };

  onValidator = (rule: any, value: string, callback: any) => {
    if (value === undefined) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');
    if (value.length !== 11) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');
    return callback();
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    return validateFields((err, values: { username: string; password: string }) => {
      if (!err) {
        return this.setState({ loading: true }, async () => {
          const { username, password } = values;
          const res = await RequestorLogin(username, password);
          console.log(res);
          return this.setState({ loading: false, auth: res.auth });
        });
      }
    });
  };

  onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    return this.props.form.setFields({
      [key]: {
        error: undefined,
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, auth } = this.state;
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
              <Button>{loading ? <Icon type="loading" /> : 'Login'}</Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const wrapped = Form.create()(LoginPage);
export default wrapped;
