import React, { Component } from 'react';
import { Row, Col, Input, Form, Icon } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';

import Button from '../../components/Button';

import { u } from '../../models/user';

import logo from '../../assets/logo.login.svg';
import styles from './styles.module.css';
import usernameValidator from '../../utils/username.validator';

class LoginPage extends Component<
  FormComponentProps & RouteComponentProps,
  {
    loading: boolean;
  }
> {
  state = {
    loading: false,
  };

  componentDidMount = async () => {
    console.log(u.GetUser());
    if (u.GetUser()) await u.UserLogout();
  };

  onValidator = (rule: any, value: string, callback: any) => {
    if (value.length === 0) return callback();
    const valid = usernameValidator(value);
    if (!valid) return callback('โปรดกรอกชื่อผู้ใช้งานให้ถูกต้อง');
    return callback();
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    const { validateFields, setFields } = this.props.form;
    return validateFields(
      (err, values: { username: string; password: string }) => {
        if (!err) {
          return this.setState({ loading: true }, async () => {
            const { username, password } = values;
            const res = await u.RequestorLogin(username, password);
            console.log(res);
            if (res.auth) return this.props.history.push('/');
            setFields({
              password: {
                value: values.password,
                errors: [new Error('รหัสผ่านไม่ถูกต้อง')],
              },
            });
            return this.setState({ loading: false });
          });
        }
      },
    );
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
    const { loading } = this.state;
    return (
      <React.Fragment>
        <div style={{ height: '150px' }} />
        <Row type="flex" justify="center">
          <Col>
            <img src={logo} alt="logo" />
          </Col>
          <Col span={22}>
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
                    { required: true, message: 'โปรดกรอกชื่อผู้ใช้งาน' },
                    {
                      validator: this.onValidator,
                    },
                  ],
                  validateTrigger: ['onBlur'],
                })(
                  <Input onChange={this.onType} placeholder="Username" />,
                )}
              </Form.Item>
            </Col>
            <Col span={18} lg={14} className={styles.input}>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'โปรดกรอกรหัสผ่าน' }],
                  validateTrigger: ['onBlur'],
                })(
                  <Input
                    onChange={this.onType}
                    placeholder="Password"
                    type="password"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={18} lg={14}>
              <Button>
                {loading ? <Icon type="loading" /> : 'Login'}
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const wrapped = Form.create()(LoginPage);
export default withRouter<RouteComponentProps, any>(wrapped);
