import React, { Component } from 'react';
import { Form, Col, Row, Input } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';

import Outline from '../../components/Outline';
import Button from '../../components/Button';

import { u } from '../../models/user';
import usernameValidator from '../../utils/username.validator';

import styles from './styles.module.css';

interface PropsTypes extends FormComponentProps {
  required?: number;
  onSubmit?: any;
}

interface StateTypes {
  users: string[];
  required: number;
  status: boolean;
  owner?: string;
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
    owner: '',
  };

  componentDidMount = () => {
    // auto scroll
    window.scroll(0, 0);
    const owner = u.GetUser().studentId;
    this.setState({ owner });

    const required = this.props.required;
    const load =
      CACHE_STATE.users.length !== 0 &&
      required === CACHE_STATE.users.length;
    if (load) {
      return this.setState(CACHE_STATE);
    }
    const users = Array(required).fill('');
    return this.setState({ users });
  };

  componentWillUnmount = () => {
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
    });
  };

  onValidator = (_rule: any, value: string, callback: any) => {
    const { form } = this.props;
    const ids: string[] = form
      .getFieldValue('users')
      .filter((e: string) => e);
    const sets = new Set(ids).size;

    if (value === undefined) return callback('โปรดกรอกรหัสผู้ใช้งาน');
    const valid = usernameValidator(value);
    if (!valid) return callback('โปรดกรอกรหัสผู้ใช้งานให้ถูกต้อง');

    if (ids.length !== sets && ids.length !== 0)
      return callback('รหัสผู้ใช้งานซ้ำ');
    return callback();
  };

  onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const key = Number(e.target.id.split('[')[1].split(']')[0]);
    const { users } = this.state;
    const { setFields } = this.props.form;
    return this.setState(
      { users: users.map((e, i) => (Number(key) === i ? value : e)) },
      () => {
        //   error exception when type
        return setFields({
          [`users[${key}]`]: {
            errors: undefined,
          },
        });
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { users, owner } = this.state;
    return (
      <React.Fragment>
        {/* outliner n' desc */}
        <Col style={{ marginTop: '-10px' }} span={24}>
          <Row type="flex" justify="start">
            {/* outliner */}
            <Outline>กรอกรหัสนักศึกษา</Outline>

            {/* description */}
            <Col className={styles.desc} span={20}>
              <p>
                ใช้รหัสนักศึกษา {users.length} คน
                สำหรับการจองพื้นที่กีฬาแบดมินตัน
              </p>
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
                            message: 'โปรดกรอกรหัสผู้ใช้งาน',
                          },
                          {
                            validator: this.onValidator,
                          },
                        ],
                        initialValue: i === 0 ? owner : e,
                        validateTrigger: ['onBlur'],
                      })(
                        <Input
                          onChange={this.onType}
                          placeholder={`รหัสผู้ใช้งานคนที่ ${i + 1}`}
                          disabled={i === 0}
                        />,
                      )}
                    </Form.Item>
                  );
                })}
              </Form>
            </Col>
          </Row>
        </Col>

        {/* Button */}
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={22}>
              <Button onClick={this.onSubmit}>ต่อไป</Button>
            </Col>
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}

const wrapped = Form.create<PropsTypes>({})(FormPage);

export default wrapped;
