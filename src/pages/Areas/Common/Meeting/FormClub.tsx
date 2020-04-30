import React, { useEffect, useState } from 'react';

import stepsList from './steps/club';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import { useLocation, useHistory, Switch, Route } from 'react-router';
import PageLayout from 'Components/Layout/Page';
import Badge from 'Components/Badge';
import { Icon, Row, Col, Input, DatePicker } from 'antd';
import BackCard from 'Components/BackCard';
import StateSteps from 'Components/StateSteps';
import { Calendar as CalendarForm } from 'Components/Forms/Meeting';

import sharedStyles from '../common/styles/styles.module.css';
import {
  setAreaInfoForm,
  initForm,
} from 'Store/reducers/areaForm/actions';
// import { buildingAPI } from 'Models/building';
import { areaAPI } from 'Models/area';
import moment, { Moment } from 'moment';
import TimeNode from 'Components/TimeTable/timetable.interface';
import weekParsedHelper from 'Utils/week.parse';
import Area from 'Models/area/area.interface';
import TimeTable from 'Components/TimeTable';

// icons
import orangeSquareIcon from 'Assets/icons/square/orange.svg';
import greySquareIcon from 'Assets/icons/square/grey.svg';
import blueSquareIcon from 'Assets/icons/square/blue.svg';
import Form, { FormComponentProps } from 'antd/lib/form';
import labelStyles from '../common/forms/styles/label';
import adjacentHour from 'Utils/adjacent.hour';
import Snackbar from 'Components/Snackbar';

const iconLabel: React.CSSProperties = {
  color: '#3B4046',
  fontSize: '14px',
  marginLeft: '5px',
  marginTop: '14px',
};

const iconSquare = (text?: string, icon?: string) => (
  <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
    <img src={icon} alt="icon" />
    <p style={iconLabel}>{text || ''}</p>
  </div>
);

// constant
const MAX_STEPS = 3;
const AREA_PARAM_IND = 5;
const PLACEHOLDER_DATE = 'DD/MM/YYYY';
const DATE_FORMAT = 'DD/MM/YYYY';
const OFFSET_DAY = 3;

const FormClub: React.FC<FormComponentProps> = props => {
  const forms = useSelector((s: RootReducers) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;

  const areaId = location.split('/')[AREA_PARAM_IND];
  const [areaState, setAreaState] = useState<Area[]>();

  const [selected, setSelected] = useState<TimeNode[]>([]);
  const [error, setError] = useState<boolean>(false);

  function goBack() {
    if (steps === 0) {
      return history.push('/reserve/area/meeting/areas');
    }
    const oldPath = location;
    const pathStep = steps + 1;
    const backPath = oldPath.slice(0, -1) + (pathStep - 1);
    return history.push(backPath);
  }

  // error observation
  useEffect(() => {
    if (error) setTimeout(() => setError(false), 1500);
  }, [error]);

  // once
  useEffect(() => {
    dispatch(initForm({ size: MAX_STEPS }));

    areaAPI.getAreaInfo(areaId).then(async a => {
      dispatch(setAreaInfoForm(a));
      console.log('raw areaStates', a);
      const areaFetch = (
        await areaAPI.getAreaAvailableWithDate(
          areaId,
          moment().add(1, 'days'),
        )
      )[0];
      setAreaState([
        {
          // ...a,
          area: {
            id: a._id,
            label: a.label,
            required: Number(a.required) || 1,
          },
          time: {
            start: a.reserve[0].start,
            stop: a.reserve[0].stop,
            interval: a.reserve[0].interval,
            week: a.reserve[0].week,
            forward: a.forward,
            disabled: areaFetch.disabled,
          },
        },
      ]);
    });
  }, []);
  const initSelectedDate = moment().add(3, 'days');
  const [selectedDate, setSelecteDate] = useState<Moment>();

  const now = moment(new Date());
  const today = now;
  const selectedWeek = Number(moment(selectedDate).format('E'));

  const { getFieldDecorator } = props.form;

  function onSelect(value: Moment, type: TimeNode['type']) {
    console.log('onSelect', value.format('HH mm'), type);

    const merge: any = [...selected, { value, type: 'selecting' }].sort(
      (a, b) => a.value.valueOf() - b.value.valueOf(),
    );

    const validSelect = adjacentHour(selected, value, 60);
    const duplicated = selected.filter(
      e => e.value.valueOf() === value.valueOf(),
    );
    const duplicatedInd = selected.findIndex(
      e => e.value.valueOf() === value.valueOf(),
    );
    if (!validSelect) {
      setError(true);
      return;
    } else if (duplicatedInd >= 0 && selected.length === 1) {
      return setSelected([]);
    } else if (duplicatedInd >= 0 && selected.length > 0) {
      console.log('dup', duplicated, duplicatedInd);
      return setSelected(selected.slice(0, duplicatedInd + 1));
    }

    setError(false);
    setSelected(merge);
  }
  console.log('selected time node', selected);
  return (
    <PageLayout titile="จองห้องประชุม">
      {/* Fixed header */}
      <Row
        className={sharedStyles.innerFixedHeader}
        type="flex"
        justify="center"
      >
        {/* steps */}
        <Col style={{ marginTop: '-12px' }} offset={2} span={18}>
          <Row type="flex" justify="center">
            <Col span={20}>
              <StateSteps
                // onClick={this.onClickStep}
                current={steps}
                steps={stepsList.map(({ label }) => ({ label }))}
              />
            </Col>
          </Row>
        </Col>

        {/* back card */}
        <Col style={{ marginTop: '4px', marginBottom: '4px' }} span={14}>
          <BackCard onClick={goBack}>
            {steps === 0 ? 'เลือกสถานที่' : stepsList[steps - 1].desc}
            {/* {backCard[step - 1]} */}
          </BackCard>
        </Col>

        {/* Badge */}
        {/* when overview hide this */}
        {steps !== MAX_STEPS && (
          <Col style={{ marginBottom: '-8px' }} span={24}>
            <Row type="flex" justify="start">
              <Badge>
                {forms.area?._id ? (
                  forms.area.label
                ) : (
                  <Icon type="loading" />
                )}
              </Badge>
            </Row>
          </Col>
        )}
      </Row>

      {/* spacing between fixed inner header */}
      <div style={{ height: '145px' }} />
      <Switch>
        <Route path="/*1">
          <CalendarForm />
          <Col
            // key={`${selectedDate.format('DD-MM')}-${
            //   e.area.id
            // }-${Math.random()}`}
            span={24}
          >
            {/* icon detail */}
            <Col span={24}>
              <Row type="flex" justify="center">
                {iconSquare('ว่าง', orangeSquareIcon)}
                {iconSquare('ไม่ว่าง/รอการอนุมัติ', greySquareIcon)}
                {iconSquare('ที่ถูกเลือก', blueSquareIcon)}
              </Row>
            </Col>

            <Col span={24}>
              <Form.Item>
                <p style={labelStyles}>
                  ตั้งแต่วันที่ <span style={{ color: 'red' }}>*</span>
                </p>

                {getFieldDecorator('date', {
                  rules: [{ required: true, message: 'กรุณากรอก' }],
                  initialValue: today
                    .add(OFFSET_DAY, 'days')
                    .startOf('days'),
                })(
                  <DatePicker
                    disabledDate={current => {
                      return Boolean(
                        current &&
                          current <
                            moment()
                              .add(OFFSET_DAY, 'days')
                              .endOf('day'),
                      );
                    }}
                    placeholder={PLACEHOLDER_DATE}
                    format={[DATE_FORMAT]}
                    style={{ width: '100%' }}
                    onChange={date => {
                      setSelecteDate(date || initSelectedDate);
                      setSelected([]);
                    }}
                  />,
                )}
              </Form.Item>
            </Col>

            {/* TimeTable */}
            {areaState &&
              areaState.map(e => {
                const { area, time } = e;
                const start = moment(time.start).startOf('hour');
                const weekParsed = weekParsedHelper(e.time.week);
                if (!weekParsed.includes(selectedWeek)) return null;

                let disabledMapped: TimeNode[] = [];
                const cur = start;
                while (cur <= time.stop) {
                  disabledMapped.push({
                    value: moment(cur),
                    type: 'available',
                  });
                  cur.add(time.interval || 60, 'minute');
                }
                disabledMapped.push({
                  value: moment(cur),
                  type: 'available',
                });

                // disable cur by curtime
                // TEMPORALILY DISABLED FOR TESTING
                disabledMapped = disabledMapped
                  // .map(e => {
                  //   // skip when day not in
                  //   if (today.valueOf() !== selectedDate?.valueOf())
                  //     return e;

                  //   const valueMapped = moment(
                  //     e.value.format('HH.mm'),
                  //     'HH.mm',
                  //   ).set('date', Number(selectedDate?.format('DD')));
                  //   const disabled: TimeNode = {
                  //     type: 'disabled',
                  //     value: moment(valueMapped),
                  //   };
                  //   // console.log(disabled.value.format('HH:mm DD-MM-YYY'), 'd - t', today.format('HH:mm DD-MM-YYY'));
                  //   // console.log(today.diff(valueMapped));
                  //   const pastDate = today.diff(valueMapped) > 0;
                  //   // console.log('pastdate', pastDate);
                  //   if (pastDate) return disabled;

                  //   return e;
                  // })
                  .filter(({ type }) => type !== 'available');

                const disabledMappedAPI = [
                  ...disabledMapped,
                  ...(time.disabled || []),
                ];

                return (
                  <Col key={`${Math.random()}`} span={24}>
                    <TimeTable
                      selected={selected}
                      title={area.label}
                      start={time.start}
                      stop={time.stop}
                      interval={time.interval || 60}
                      //   onSelect={onSelectTime}
                      onSelect={onSelect}
                      disabled={disabledMappedAPI}
                    />
                  </Col>
                );
              })}
          </Col>
        </Route>
        <Route path="/*2">2 ja</Route>
        <Route path="/*3">3 ja</Route>
      </Switch>

      {error && (
        <Snackbar show={true}>
          <p style={{ fontWeight: 'bold' }}>ไม่สามารถจองเว้นชั่วโมงได้</p>{' '}
          <p>กรุณาจองชั่วโมงที่ติดกัน</p>
        </Snackbar>
      )}
    </PageLayout>
  );
};

export default Form.create({ name: 'formclub' })(FormClub);
