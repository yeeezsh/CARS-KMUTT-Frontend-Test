import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Checkbox, TimePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import { useDispatch } from 'react-redux';
import FormLabel from 'Components/FormLabel';

// shared
import { DEFAULT_REQUIED_MSG } from './rules/required';
import fontOrangeBold from './styles/font.orange.bold';
import labelStyles from './styles/label';

// styles
const DIV_SPACES: React.CSSProperties = {
  marginTop: -36,
};
const TIME_PICKER_STYLES: React.CSSProperties = {
  width: '100%',
};

// constant
const CUR_IND = 2;
const PLACEHOLDER_TIME = '00:00';
const TIME_FORMAT = 'HH:mm';
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

  const [air, setAir] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(false);

  return (
    <React.Fragment>
      <FormLabel step={CUR_IND}>
        เครื่องปรับอากาศและเครื่องขยายเสียง
      </FormLabel>

      {/* air */}
      <Form.Item>
        {getFieldDecorator('airRequired', {
          valuePropName: 'checked',
          initialValue: false,
        })(
          <Checkbox onChange={() => setAir(!air)}>
            <span style={fontOrangeBold}>เครื่องปรับอากาศ</span>
          </Checkbox>,
        )}
      </Form.Item>

      {/* timer selector */}
      <div
        style={{
          ...{ filter: !air ? 'grayscale(100%)' : '' },
          ...DIV_SPACES,
        }}
      >
        {/* start air time */}
        <Row type="flex" justify="space-between">
          <Col span={10}>
            <Form.Item>
              <span style={labelStyles}>ตั้งแต่เวลา</span>
              {getFieldDecorator('startAirTime', {
                rules: [{ required: air, message: DEFAULT_REQUIED_MSG }],
              })(
                <TimePicker
                  style={TIME_PICKER_STYLES}
                  disabled={!air}
                  format={TIME_FORMAT}
                  placeholder={PLACEHOLDER_TIME}
                />,
              )}
            </Form.Item>
          </Col>

          {/* stop air time */}
          <Col span={10}>
            <Form.Item>
              <span style={labelStyles}>ถึงเวลา</span>
              {getFieldDecorator('stopAirTime', {
                rules: [{ required: air, message: DEFAULT_REQUIED_MSG }],
              })(
                <TimePicker
                  style={TIME_PICKER_STYLES}
                  disabled={!air}
                  format={TIME_FORMAT}
                  placeholder={PLACEHOLDER_TIME}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* sound */}
      <Form.Item>
        {getFieldDecorator('soundRequired', {
          valuePropName: 'checked',
          initialValue: false,
        })(
          <Checkbox onChange={() => setSound(!sound)}>
            <span style={fontOrangeBold}>เครื่องขยายเสียง</span>
          </Checkbox>,
        )}
      </Form.Item>

      {/* timer selector */}
      <div
        style={{
          ...{ filter: !sound ? 'grayscale(100%)' : '' },
          ...DIV_SPACES,
        }}
      >
        {/* start sound time */}
        <Row type="flex" justify="space-between">
          <Col span={10}>
            <Form.Item>
              <span style={labelStyles}>ตั้งแต่เวลา</span>
              {getFieldDecorator('startSoundTime', {
                rules: [{ required: sound, message: DEFAULT_REQUIED_MSG }],
              })(
                <TimePicker
                  style={TIME_PICKER_STYLES}
                  disabled={!sound}
                  format={TIME_FORMAT}
                  placeholder={PLACEHOLDER_TIME}
                />,
              )}
            </Form.Item>
          </Col>

          {/* stop sound time */}
          <Col span={10}>
            <Form.Item>
              <span style={labelStyles}>ถึงเวลา</span>
              {getFieldDecorator('stopSoundTime', {
                rules: [{ required: sound, message: DEFAULT_REQUIED_MSG }],
              })(
                <TimePicker
                  style={TIME_PICKER_STYLES}
                  disabled={!sound}
                  format={TIME_FORMAT}
                  placeholder={PLACEHOLDER_TIME}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      </div>

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
