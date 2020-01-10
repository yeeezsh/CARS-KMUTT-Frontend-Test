import React, { Component } from 'react';
import { Form, Col, Row, Input } from 'antd';

import styles from './styles.module.css';

import { FormComponentProps } from 'antd/lib/form/Form';

import Outline from '../../components/Outline';
import Button from '../../components/Button';

interface PropsTypes extends FormComponentProps {
  required?: number;
  onSubmit?: any;
}

interface StateTypes {
  users: string[];
  required: number;
  status: boolean;
}

let CACHE_STATE: StateTypes = {
  users: [],
  required: 2,
  status: false,
};

class FormPage extends Component<PropsTypes, StateTypes> {
  state = {
    users: [],
    required: 2,
    status: false,
  };

  componentDidMount = () => {
    console.log('form mounting', this.state, CACHE_STATE);
    const required = this.props.required;
    const load = CACHE_STATE.users.length !== 0 && required === CACHE_STATE.users.length;
    if (load) {
      return this.setState(CACHE_STATE);
    }
    const users = Array(required).fill('');
    return this.setState({ users });
  };

  componentWillUnmount = () => {
    console.log('form unmounting', this.state, CACHE_STATE);
    CACHE_STATE = this.state;
  };

  onSubmit = (e: any): void => {
    e.preventDefault();
    const { form } = this.props;
    return form.validateFields((err, values: { users: string[] }) => {
      if (!err) {
        const data = values.users.map((e: string) => e);

        return this.setState({ users: data }, () => {
          const { users } = this.state;
          return this.props.onSubmit({
            users,
            status: true,
          });
        });
      }
      return this.props.onSubmit({ staus: false });
      //   return this.setState({ status: false }, () => {
      //     const { status } = this.state;
      //     return this.props.onSubmit({ status });
      //   });
    });
  };

  onValidator = (rule: any, value: string, callback: any) => {
    const { form } = this.props;
    const ids: string[] = form.getFieldValue('users').filter((e: string) => e);
    const sets = new Set(ids).size;

    if (value === undefined) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');
    if (value.length !== 11) return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง');

    if (ids.length !== sets && ids.length !== 0) return callback('รหัสนักศึกษาซ้ำ');
    return callback();
  };

  onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const key = e.target.id.split('[')[1].split(']')[0];
    const { users } = this.state;
    this.setState(
      {
        users: users.map((e, i) => (Number(key) === i ? value : e)),
      },
      () => {
        //   error exception when type
        return this.props.form.setFields({
          'users[0]': {
            error: undefined,
          },
        });
      },
    );
  };

  render() {
    console.log('form states', this.state);
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
                        initialValue: e,
                        validateTrigger: ['onBlur'],
                      })(<Input onChange={this.onType} placeholder={`รหัสนักศึกษาคนที่ ${i + 1}`} type={'number'} />)}
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
