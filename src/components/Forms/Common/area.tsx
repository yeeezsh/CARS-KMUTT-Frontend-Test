import { Col, Row } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import BreakingLine from 'Components/BreakingLine';
import Button from 'Components/Button';
import FormLabel from 'Components/FormLabel';
// import { data } from 'Services/reserve/data';
import NumberWithToggle from 'Components/NumberWithToggle';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducersType } from 'Store/reducers';
import {
  fillForm,
  setFormCurrentIndex,
  submitForm,
} from 'Store/reducers/areaForm/actions';

export interface AreaForm {
  basketball: number;
  volleyball: number;
  sepaktakraw: number;
  badminton: number;
  tennis: number;
  tabletennis: number;
}

const CustomBreakLine: React.FC = () => (
  <div style={{ margin: '2px 0px 2px 0px' }}>
    <BreakingLine lineSize={0.5} color="#D9D9D9" />
  </div>
);

// constant
const AreaForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const CUR_IND = props.ind || 2;

  const dispatch = useDispatch();
  const { forms } = useSelector(
    (s: RootReducersType) => s.AreaFormReducers,
  );
  const data: AreaForm = forms[CUR_IND];
  const [ownForms, setOwnForms] = useState({});

  //   set index when form is loaded
  useEffect(() => {
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  function onSubmit() {
    dispatch(fillForm({ form: ownForms, valid: true }));
    dispatch(submitForm());
  }

  function onNumberChange(name: string, value: number): void {
    setOwnForms(prev => ({ ...prev, [name]: value }));
    return;
  }
  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>บริการสนามกีฬา</FormLabel>

      {/* basketball */}
      <CustomBreakLine />
      <NumberWithToggle
        name="basketball"
        label={'สนามบาสเกตบอล'}
        unit="สนาม"
        onChange={onNumberChange}
        value={data.basketball}
      />

      <CustomBreakLine />

      {/* volleyball */}
      <NumberWithToggle
        name="volleyball"
        label={'สนามวอลเลย์บอล'}
        unit="สนาม"
        onChange={onNumberChange}
        value={data.volleyball}
      />
      <CustomBreakLine />

      {/* sepaktakraw */}
      <NumberWithToggle
        name="sepaktakraw"
        label={'สนามเซปัคตะกร้อ'}
        unit="สนาม"
        onChange={onNumberChange}
        value={data.sepaktakraw}
      />
      <CustomBreakLine />

      {/* badminton */}
      <NumberWithToggle
        name="badminton"
        label={'สนามแบดมินตัน'}
        unit="สนาม"
        onChange={onNumberChange}
        value={data.badminton}
      />
      <CustomBreakLine />

      {/* tennis */}
      <NumberWithToggle
        name="tennis"
        label={'สนามเทนนิส'}
        unit="สนาม"
        onChange={onNumberChange}
        value={data.tennis}
      />
      <CustomBreakLine />

      {/* tabletennis */}
      <NumberWithToggle
        name="tabletennis"
        label={'โต๊ะเทเบิลเทนนิส'}
        unit="ตัว"
        onChange={onNumberChange}
        value={data.tabletennis}
      />
      <CustomBreakLine />

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
>({ name: 'area' })(AreaForm);
