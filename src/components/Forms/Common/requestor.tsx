import { Col, Form, Input, Radio, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import FormLabel from 'Components/FormLabel';
import { Department, faculties } from 'Models/forms/department';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// store & data
import { RootReducersType } from 'Store/reducers';
import {
  fillForm,
  setFormCurrentIndex,
  submitForm,
} from 'Store/reducers/areaForm/actions';
import { DEFAULT_REQUIRED_RULES } from './rules/required';
import { DEFAULT_USERNAME_RULES } from './rules/username';
// styles
import labelStyles from './styles/label';

export interface RequestorForm {
  userType: string;
  requestorId: string;
  name: string;
  faculty: string;
  department: string;
  studentYear?: string;
  phone: string;
}

type UserType = 'student' | 'prof';

// constant
const RequestorForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const CUR_IND = props.ind || 0;
  const { getFieldDecorator, validateFields, setFieldsValue } = props.form;
  const dispatch = useDispatch();
  const { forms } = useSelector(
    (s: RootReducersType) => s.AreaFormReducers,
  );
  const data: RequestorForm = forms[CUR_IND];

  const [userType, setUserType] = useState<UserType>('student');

  function onSubmit() {
    validateFields((err, values) => {
      dispatch(fillForm({ form: values, valid: false }));
      if (!err) {
        dispatch(fillForm({ form: values, valid: true }));
        dispatch(submitForm());
      }
    });
  }

  const [departments, setDepartment] = useState<Department>([]);
  function onFaculty(value: string) {
    console.log('on faculty', value);
    const selectedDepartment = faculties.find(e => e.value === value);
    setDepartment(selectedDepartment?.departments || []);
    setFieldsValue({ department: '' }); // remove selected department when faculty changed
  }

  //   set index when form is loaded
  useEffect(() => {
    dispatch(setFormCurrentIndex(CUR_IND));
    // fix issues disabled when load old data forms
    if (data.faculty) {
      onFaculty(data.faculty);
    }
  }, []);

  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>รายละเอียดผู้ขอใช้บริการ</FormLabel>
      {/* user type */}
      <Form.Item>
        {getFieldDecorator('userType', {
          rules: [DEFAULT_REQUIRED_RULES],
          initialValue: data.userType || 'student',
        })(
          <Row justify="space-around" type="flex">
            <Radio.Group
              onChange={e => setUserType(e.target.value)}
              defaultValue={data.userType || 'student'}
            >
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
        <span style={labelStyles}>
          {userType === 'student' ? 'รหัสนักศึกษา 11 หลัก' : 'รหัสบุคลากร'}
        </span>
        {getFieldDecorator('requestorId', {
          rules: [DEFAULT_REQUIRED_RULES, DEFAULT_USERNAME_RULES],
          validateTrigger: ['onBlur'],
          initialValue: data.requestorId || '',
        })(
          <Input
            placeholder={
              userType === 'student'
                ? 'รหัสนักศึกษา 11 หลัก'
                : 'รหัสบุคลากร'
            }
          />,
        )}
      </Form.Item>

      {/* name id */}
      <Form.Item>
        <span style={labelStyles}>ชื่อ-นามสกุล</span>
        {getFieldDecorator('name', {
          rules: [DEFAULT_REQUIRED_RULES],
          validateTrigger: ['onBlur'],
          initialValue: data.name || '',
        })(<Input placeholder="ชื่อ - นามสกุล" />)}
      </Form.Item>

      {/* faculties */}
      <Form.Item>
        <span style={labelStyles}>คณะ</span>
        {getFieldDecorator('faculty', {
          rules: [DEFAULT_REQUIRED_RULES],
          initialValue: data.faculty || undefined,
        })(
          <Select
            onChange={onFaculty}
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
          initialValue: data.department || undefined,
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
        {userType === 'student' && (
          <Col span={8}>
            <Form.Item>
              <span style={labelStyles}>ชั้นปี</span>
              {getFieldDecorator('year', {
                rules: [DEFAULT_REQUIRED_RULES],
                initialValue: data.studentYear || 1,
              })(<Input type="number" />)}
            </Form.Item>
          </Col>
        )}

        <Col span={userType === 'student' ? 16 : 24}>
          <Form.Item>
            <span style={labelStyles}>โทรศัพท์</span>
            {getFieldDecorator('phone', {
              rules: [DEFAULT_REQUIRED_RULES],
              initialValue: data.phone || '',
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

export default Form.create<
  FormComponentProps & {
    ind?: number;
  }
>({ name: 'requestor' })(RequestorForm);
