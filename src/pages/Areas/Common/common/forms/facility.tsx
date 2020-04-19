import React, { useEffect, useState } from 'react';
import { Form, Radio, Row, Col, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import labelStyles from './styles/label';
import { faculties, Department } from 'Models/forms/department';
import { DEFAULT_REQUIRED_RULES } from './rules/required';
import { DEFAULT_USERNAME_RULES } from './rules/username';
import FormLabel from 'Components/FormLabel';

// constant
const CUR_IND = 2;
const FacilityForm: React.FC<FormComponentProps & {
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
      <FormLabel step={CUR_IND}>
        เครื่องปรับอากาศและเครื่องขยายเสียง
      </FormLabel>

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

export default Form.create({ name: 'requestor' })(FacilityForm);
