import React, { useEffect } from 'react';
import { Form, Radio, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from 'Store/reducers';

// constant
const CUR_IND = 0;
const RequestorForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();
  const canNext = useSelector(
    (s: RootReducers) => s.AreaFormReducers.canNext,
  );

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

  //   function onForm(value)

  return (
    <React.Fragment>
      <Form.Item>
        {getFieldDecorator('userType', {
          rules: [{ required: true }],
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
