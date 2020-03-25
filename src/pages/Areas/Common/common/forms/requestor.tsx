import React, { useEffect, useState } from 'react';
import { Form, Radio, Row, Col, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import labelStyles from './styles/label';
import { faculties, Department } from 'Models/forms/department';
import { DEFAULT_REQUIRED_RULES } from './rules/required';

// constant
const CUR_IND = 0;
const RequestorForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();
  // const canNext = useSelector(
  //   (s: RootReducers) => s.AreaFormReducers.canNext,
  // );

  //   set index when form is loaded
  useEffect(() => {
    dispatch({
      type: 'SET_FORM_CUR',
      payload: { cur: props.ind || CUR_IND },
    });
  }, []);

  function onSubmit() {
    validateFields((err, values) => {
      dispatch({
        type: 'FILL_FORM',
        payload: {
          form: values,
          valid: false,
        },
      });
      if (!err) {
        dispatch({
          type: 'FILL_FORM',
          payload: {
            form: values,
            valid: true,
          },
        });
        dispatch({ type: 'SUBMIT_FORM' });
      }
    });
  }

  const [departments, setDepartment] = useState<Department>([]);
  function onFaculty(value: string) {
    console.log('on faculty', value);
    const selectedDepartment = faculties.find(e => e.value === value);
    setDepartment(selectedDepartment?.departments || []);
  }

  return (
    <React.Fragment>
      {/* user type */}
      <Form.Item>
        {getFieldDecorator('userType', {
          rules: [DEFAULT_REQUIRED_RULES],
        })(
          <Row justify="space-around" type="flex">
            <Radio.Group>
              <Radio value="prof">อาจารย์</Radio>
              <Radio style={{ paddingLeft: 50 }} value="student">
                นักศึกษา
              </Radio>
            </Radio.Group>
          </Row>,
        )}
      </Form.Item>

      {/* requestor id */}
      <Form.Item>
        <span style={labelStyles}>รหัสนักศึกษา</span>
        {getFieldDecorator('requestorId', {
          rules: [DEFAULT_REQUIRED_RULES],
        })(<Input placeholder="รหัสนักศึกษา 11 หลัก" />)}
      </Form.Item>

      {/* faculties */}
      <Form.Item>
        <span style={labelStyles}>คณะ</span>
        {getFieldDecorator('faculty', {
          rules: [DEFAULT_REQUIRED_RULES],
        })(
          <Select
            onSelect={onFaculty}
            style={{ width: '100%', margin: 0, padding: 0 }}
          >
            {faculties.map((e, i) => (
              <Select.Option key={i} value={e.value}>
                {e.label}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>

      {/* departments */}
      <Form.Item>
        <span style={labelStyles}>ภาควิชา</span>
        {getFieldDecorator('department', {
          rules: [DEFAULT_REQUIRED_RULES],
        })(
          <Select
            disabled={!departments[0] ? true : false}
            style={{ width: '100%', margin: 0, padding: 0 }}
          >
            {departments[0] &&
              departments.map((e, i) => (
                <Select.Option key={i} value={e.value}>
                  {e.label}
                </Select.Option>
              ))}
          </Select>,
        )}
      </Form.Item>

      {/* Class an d Phone */}
      <Row type="flex" justify="center" gutter={16}>
        <Col span={8}>
          <Form.Item>
            <span style={labelStyles}>ชั้นปี</span>
            {getFieldDecorator('year', {
              rules: [DEFAULT_REQUIRED_RULES],
              initialValue: 1,
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item>
            <span style={labelStyles}>โทรศัพท์</span>
            {getFieldDecorator('phone', {
              rules: [DEFAULT_REQUIRED_RULES],
            })(<Input placeholder="091-234-5678" />)}
          </Form.Item>
        </Col>
      </Row>

      {/* action */}
      <Col span={24}>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Button onClick={onSubmit}>ต่อไป</Button>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default Form.create({ name: 'requestor' })(RequestorForm);
