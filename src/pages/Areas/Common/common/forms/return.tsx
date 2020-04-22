import React, { useEffect, useState } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Row, DatePicker, Col } from 'antd';

import FormLabel from 'Components/FormLabel';
import Button from 'Components/Button';

// styles
import labelStyles from './styles/label';

// store & data
import { RootReducers } from 'Store/reducers';
// import i, { END_POINT } from 'Models/axios.interface';
import { DEFAULT_REQUIRED_RULES } from './rules/required';

type DateType = 'oneday' | 'range';
export interface ReturnForm {
  return: Moment;
}

// constant
const PLACEHOLDER_DATE = 'DD/MM/YYYY';
const DATE_FORMAT = 'DD/MM/YYYY';

const ReturnForm: React.FC<FormComponentProps & {
  ind?: number;
  conditionFormIndex?: number;
}> = props => {
  const CUR_IND = props.ind || 4;
  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms } = useSelector((s: RootReducers) => s.AreaFormReducers);
  const data: ReturnForm = forms[CUR_IND];

  //   set index when form is loaded
  useEffect(() => {
    dispatch({
      type: 'SET_FORM_CUR',
      payload: { cur: CUR_IND },
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

  const equipmentForm = forms[props.conditionFormIndex || 3];
  const mustReturn = Object.keys(equipmentForm).some(
    e => equipmentForm[e] > 0,
  );
  console.log('eq form', equipmentForm);
  console.log('must return', mustReturn);
  //   if (!mustReturn) {
  //     // onSubmit();
  //     dispatch({
  //       type: 'FILL_FORM',
  //       payload: {
  //         form: {},
  //         valid: true,
  //       },
  //     });
  //     dispatch({ type: 'SUBMIT_FORM' });
  //   }

  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>วันส่งคืนวัสดุและอุปกรณ์</FormLabel>

      <Row type="flex" justify="center">
        {/* START */}
        <Col span={24}>
          <Form.Item>
            <span style={labelStyles}>
              วัน/เดือน/ปี ส่งคืนวัสดุและอุปกรณ์
              <span style={{ color: 'red' }}>*</span>
            </span>

            {getFieldDecorator('return', {
              rules: mustReturn ? [DEFAULT_REQUIRED_RULES] : [],
              initialValue: data.return || null,
            })(
              <DatePicker
                style={{ width: '100%' }}
                format={[DATE_FORMAT]}
                placeholder={PLACEHOLDER_DATE}
              />,
            )}
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
>({ name: 'project' })(ReturnForm);
