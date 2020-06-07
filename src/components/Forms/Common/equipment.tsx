import React, { useEffect, useState } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import FormLabel from 'Components/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import NumberWithToggle from 'Components/NumberWithToggle';
import BreakingLine from 'Components/BreakingLine';
import { Col, Row, Input } from 'antd';
import Button from 'Components/Button';
import labelStyles from './styles/label';
import {
  setFormCurrentIndex,
  fillForm,
  submitForm,
} from 'Store/reducers/areaForm/actions';

export interface EquipmentForm {
  football: number;
  futsal: number;
  basketball: number;
  volleyball: number;
  sepaktakraw: number;
  shareball: number;
  shareballbasket: number;
  other: string;
}

const CustomBreakLine: React.FC = () => (
  <div style={{ margin: '2px 0px 2px 0px' }}>
    <BreakingLine lineSize={0.5} color="#D9D9D9" />
  </div>
);

// constant
const EquipmentForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const CUR_IND = props.ind || 3;

  const dispatch = useDispatch();
  const { forms } = useSelector((s: RootReducers) => s.AreaFormReducers);
  const data: EquipmentForm = forms[CUR_IND];
  const [ownForms, setOwnForms] = useState({});
  const [other, setOther] = useState('');

  //   set index when form is loaded
  useEffect(() => {
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  function onSubmit() {
    dispatch(fillForm({ form: { ...ownForms, other }, valid: true }));
    dispatch(submitForm());
  }

  function onNumberChange(name: string, value: number): void {
    setOwnForms(prev => ({ ...prev, [name]: value }));
    return;
  }
  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>บริการวัสดุอุปกรณ์กีฬา</FormLabel>

      <CustomBreakLine />
      <NumberWithToggle
        name="football"
        label={'ลูกฟุตบอล'}
        unit="ลูก"
        onChange={onNumberChange}
        value={data.football}
      />

      <CustomBreakLine />

      <NumberWithToggle
        name="futsal"
        label={'ลูกฟุตซอล'}
        unit="ลูก"
        onChange={onNumberChange}
        value={data.futsal}
      />
      <CustomBreakLine />

      <NumberWithToggle
        name="basketball"
        label={'ลูกบาสเกตบอล'}
        unit="ลูก"
        onChange={onNumberChange}
        value={data.basketball}
      />
      <CustomBreakLine />

      <NumberWithToggle
        name="volleyball"
        label={'ลูกวอลเลย์บอล'}
        unit="ลูก"
        onChange={onNumberChange}
        value={data.volleyball}
      />
      <CustomBreakLine />

      <NumberWithToggle
        name="sepaktakraw"
        label={'ลูกเซปัคตะกร้อ'}
        unit="ลูก"
        onChange={onNumberChange}
        value={data.sepaktakraw}
      />
      <CustomBreakLine />

      <NumberWithToggle
        name="shareball"
        label={'ลูกแชร์บอล'}
        unit="ลูก"
        onChange={onNumberChange}
        value={data.shareball}
      />
      <CustomBreakLine />

      <NumberWithToggle
        name="shareballbasket"
        label={'ตะกร้าแชร์บอล'}
        unit="ตะกร้า"
        onChange={onNumberChange}
        value={data.shareballbasket}
      />
      <CustomBreakLine />

      {/* name id */}
      <Form.Item>
        <span
          style={{
            ...labelStyles,
            ...{ fontWeight: 'bold', color: '#666666' },
          }}
        >
          อื่นๆ (ระบุ)
        </span>
        <Input
          onChange={e => setOther(e.target.value)}
          defaultValue={data.other}
          placeholder="อุปกรณ์อื่น ๆ ที่ต้องการขอใช้ (ถ้ามี)"
        />
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

export default Form.create<
  FormComponentProps & {
    ind?: number;
  }
>({ name: 'area' })(EquipmentForm);
