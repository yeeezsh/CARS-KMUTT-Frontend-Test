import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Checkbox, TimePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'Components/Button';
import FormLabel from 'Components/FormLabel';

export interface FacilityForm {
  airRequired: boolean;
  startAirTime?: Moment;
  stopAirTime?: Moment;
  soundRequired: boolean;
  startSoundTime?: Moment;
  stopSoundTime?: Moment;
}

// shared
import { DEFAULT_REQUIED_MSG } from './rules/required';
import fontOrangeBold from './styles/font.orange.bold';
import labelStyles from './styles/label';
import { Moment } from 'moment';
import { RootReducers } from 'Store/reducers';

// styles
const DIV_SPACES: React.CSSProperties = {
  marginTop: -36,
};
const TIME_PICKER_STYLES: React.CSSProperties = {
  width: '100%',
};

// constant
const PLACEHOLDER_TIME = '00:00';
const TIME_FORMAT = 'HH:mm';
const FacilityForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const CUR_IND = props.ind || 2;
  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms } = useSelector((s: RootReducers) => s.AreaFormReducers);
  const data: FacilityForm = forms[CUR_IND];

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

  //   set index when form is loaded
  useEffect(() => {
    dispatch({
      type: 'SET_FORM_CUR',
      payload: { cur: CUR_IND },
    });

    // when load forms data
    if (data.airRequired) {
      setAir(data.airRequired);
    }
    if (data.soundRequired) {
      setSound(data.soundRequired);
    }
  }, []);

  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>
        เครื่องปรับอากาศและเครื่องขยายเสียง
      </FormLabel>

      {/* air */}
      <Form.Item>
        {getFieldDecorator('airRequired', {
          valuePropName: 'checked',
          initialValue: data.airRequired || false,
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
                initialValue: data.startAirTime || null,
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
                initialValue: data.stopAirTime || null,
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
          initialValue: data.soundRequired || false,
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
                initialValue: data.startSoundTime || null,
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
                initialValue: data.stopSoundTime || null,
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

export default Form.create<
  FormComponentProps & {
    ind?: number;
  }
>({ name: 'requestor' })(FacilityForm);
