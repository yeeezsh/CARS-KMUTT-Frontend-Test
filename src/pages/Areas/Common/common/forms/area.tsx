import React, { useEffect, useState } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import FormLabel from 'Components/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import { data } from 'Models/reserve/data';
import NumberWithToggle from 'Components/NumberWithToggle';

// constant
const AreaForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const CUR_IND = props.ind || 2;

  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms } = useSelector((s: RootReducers) => s.AreaFormReducers);
  //   const data: ProjectForm = forms[CUR_IND];

  //   set index when form is loaded
  useEffect(() => {
    dispatch({
      type: 'SET_FORM_CUR',
      payload: { cur: CUR_IND },
    });
  }, []);
  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>
        เครื่องปรับอากาศและเครื่องขยายเสียง
      </FormLabel>

      {/* air */}
      <Form.Item>
        {getFieldDecorator('test', {
          //   valuePropName: 'checked',
          //   initialValue: data.airRequired || false,
          initialValue: 0,
        })(<NumberWithToggle label={'สนามบาสเกตบอล'} unit="สนาม" />)}
      </Form.Item>
    </React.Fragment>
  );
};

export default Form.create<
  FormComponentProps & {
    ind?: number;
  }
>({ name: 'area' })(AreaForm);
