import { Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import Button from 'Components/Button';
import ButtonActionLayout from 'Components/Layout/ButtonActionLayout';
import Outline from 'Components/Outline';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootReducersType } from 'Store/reducers';
import usernameValidator from 'Utils/username.validator';
import styles from './styles.module.css';

interface PropsTypes extends FormComponentProps {
  required?: number;
  onSubmit?: any;
  owner?: string;
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
  constructor(props: PropsTypes) {
    super(props);
    this.state = {
      users: [],
      required: 2,
      status: false,
    };
  }

  componentDidMount = () => {
    // auto scroll
    window.scroll(0, 0);

    const required = this.props.required;
    const users = Array(required).fill('');
    const load =
      CACHE_STATE.users.length !== 0 &&
      required === CACHE_STATE.users.length;
    if (load) return this.setState(CACHE_STATE);

    return this.setState({ users });
  };

  componentWillUnmount = () => {
    CACHE_STATE = this.state;
  };

  onSubmit = (): void => {
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
    if (value.length === 0) return callback();

    const { form } = this.props;
    const ids: string[] = form
      .getFieldValue('users')
      .filter((e: string) => e);
    const sets = new Set(ids).size;

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
    const { users } = this.state;
    const { owner } = this.props;

    console.log('owner from props jaaa', owner);
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
                {users.map((e, i) => {
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
        <ButtonActionLayout>
          <Button onClick={this.onSubmit}>ต่อไป</Button>
        </ButtonActionLayout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (rootReducers: RootReducersType) => {
  const { SportReducers } = rootReducers;
  return {
    owner: SportReducers.owner,
  };
};

const wrapped = Form.create<PropsTypes>({})(FormPage);

export default connect(mapStateToProps)(wrapped);
