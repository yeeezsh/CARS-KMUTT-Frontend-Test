import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Form, Col, Row, Input } from 'antd';

import styles from './styles.module.css';

import { FormComponentProps } from 'antd/lib/form/Form';

import Outline from '../../components/Outline';
import Button from '../../components/Button';

interface PropsTypes extends FormComponentProps {
  required?: number;
  onFilled?: any;
}

class FormPage extends Component<
  PropsTypes,
  {
    users: string[];
    required: number;
    status: boolean;
  }
> {
  state = {
    users: [],
    required: 2,
    status: false,
  };

  componentDidMount = () => {
    const required = this.props.required || this.state.required;
    const users = Array(required).fill('');
    return this.setState({ users });
  };

  onSubmit = (e: any): void => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // const { keys, names } = values;
        // console.log('Received values of form: ', values);
        // console.log(
        //   'Merged values:',
        //   keys.map((key: any) => names[key]),
        // );
        return this.setState(
          {
            status: true,
            users: values,
          },
          () => {
            const { users, status } = this.state;
            return this.props.onFilled({
              users,
              status,
            });
          },
        );
      }
      return this.setState({ status: false }, () => {
        const { status, users } = this.state;
        return this.props.onFilled({ status, users });
      });
    });
  };

  onValidator = (rule: any, value: string, callback: any) => {
    const { form } = this.props;
    const ids: string[] = form.getFieldValue('users');
    const sets = new Set(ids).size;

    if (value === undefined) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');
    if (value.length !== 11) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');

    if (ids.length !== sets) return callback('รหัสนักศึกษาซ้ำ');
    return callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { required } = this.state;
    return (
      <React.Fragment>
        {/* outliner n' desc */}
        <Col style={{ marginTop: '-10px' }} span={24}>
          <Row type="flex" justify="start">
            {/* outliner */}
            <Outline>กรอกรหัสนักศึกษา</Outline>

            {/* description */}
            <Col className={styles.desc} span={20}>
              <p>ใช้รหัสนักศึกษา {required} คน สำหรับการจองพื้นที่กีฬาแบดมินตัน</p>
            </Col>
          </Row>
        </Col>

        {/* Form */}
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={20}>
              <Form onSubmit={this.onSubmit}>
                {this.state.users.map((e, i) => {
                  return (
                    <Form.Item key={i}>
                      {getFieldDecorator(`users[${i}]`, {
                        rules: [
                          {
                            required: true,
                            // message: 'โปรดกรอกรหัสนักศึกษาให้ถูกต้อง',
                            max: 11,
                            validator: this.onValidator,
                          },
                        ],
                        initialValue: undefined,
                        validateTrigger: ['onBlur'],
                      })(<Input placeholder={`รหัสนักศึกษาคนที่ ${i + 1}`} type={'number'} />)}
                    </Form.Item>
                  );
                })}
                <Button>ต่อไป</Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}

const wrapped = Form.create<PropsTypes>({})(FormPage);

export default wrapped;
