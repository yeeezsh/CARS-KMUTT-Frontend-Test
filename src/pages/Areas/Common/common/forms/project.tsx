import React, { useEffect, useState } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { useDispatch } from 'react-redux';
import FormLabel from 'Components/FormLabel';
import labelStyles from './styles/label';
import { DEFAULT_REQUIRED_RULES } from './rules/required';
import { Input, Row, Radio, DatePicker, Col, TimePicker } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import Button from 'Components/Button';

// constant
const CUR_IND = 1;
const PLACEHOLDER_DATE = 'DD/MM/YYYY';
const PLACEHOLDER_TIME = '00:00';

const ProjectForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();

  const [selectRange, setSelectRange] = useState(true);

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

  function onDateType(e: RadioChangeEvent) {
    type DateType = 'oneday' | 'range';
    const select: DateType = e.target.value;
    if (select === 'range') return setSelectRange(true);
    setSelectRange(false);
  }
  return (
    <React.Fragment>
      <FormLabel step={2}>รายละเอียดโครงการ</FormLabel>

      {/* name id */}
      <Form.Item>
        <span style={labelStyles}>ชื่อโครงการ</span>
        {getFieldDecorator('projectName', {
          rules: [DEFAULT_REQUIRED_RULES],
        })(<Input placeholder="ชื่อโครงการ" />)}
      </Form.Item>

      {/* date type */}
      <Form.Item>
        <p style={labelStyles}>วันที่จัดโครงการ</p>
        <div style={{ marginLeft: '25%' }}>
          {getFieldDecorator('dateType', {
            rules: [DEFAULT_REQUIRED_RULES],
            initialValue: 'range',
          })(
            <Radio.Group onChange={onDateType}>
              <Radio value="oneday">วันเดียว</Radio>
              <Radio style={{ paddingLeft: 50 }} value="range">
                ระบุช่วง
              </Radio>
            </Radio.Group>,
          )}
        </div>
      </Form.Item>

      {/* DATE SELECTOR  */}
      {selectRange && (
        <Row type="flex" justify="center">
          {/* START */}
          <Col span={12}>
            <Form.Item>
              <span style={labelStyles}>ตั้งแต่วันที่</span>
              {getFieldDecorator('startDate', {
                rules: [DEFAULT_REQUIRED_RULES],
                initialValue: null,
              })(
                <DatePicker
                  format={['DD/MM/YYYY']}
                  placeholder={PLACEHOLDER_DATE}
                />,
              )}
            </Form.Item>
          </Col>

          {/* STOP */}
          <Col span={12}>
            <Form.Item>
              <span style={labelStyles}>ถึงวันที่</span>
              {getFieldDecorator('stopDate', {
                rules: [DEFAULT_REQUIRED_RULES],
                initialValue: null,
              })(
                <DatePicker
                  format={['DD/MM/YYYY']}
                  placeholder={PLACEHOLDER_DATE}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      )}

      {/* TIME SELECTOR  */}
      <Row type="flex" justify="center">
        {/* START */}
        <Col span={12}>
          <Form.Item>
            <span style={labelStyles}>ตั้งแต่เวลา</span>
            {getFieldDecorator('startTime', {
              rules: [DEFAULT_REQUIRED_RULES],
              initialValue: null,
            })(
              <TimePicker
                format={'HH:mm'}
                placeholder={PLACEHOLDER_TIME}
              />,
            )}
          </Form.Item>
        </Col>

        {/* STOP */}
        <Col span={12}>
          <Form.Item>
            <span style={labelStyles}>ถึงเวลา</span>
            {getFieldDecorator('stopTime', {
              rules: [DEFAULT_REQUIRED_RULES],
              initialValue: null,
            })(
              <TimePicker
                format={'HH:mm'}
                placeholder={PLACEHOLDER_TIME}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      {/* consult id */}
      <Form.Item>
        <span style={labelStyles}>อาจารย์ที่ปรึกษาโครงการ</span>
        {getFieldDecorator('advisor', {
          rules: [DEFAULT_REQUIRED_RULES],
        })(<Input placeholder="ชื่อ - นามสกุล" />)}
      </Form.Item>

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

export default Form.create({ name: 'project' })(ProjectForm);
