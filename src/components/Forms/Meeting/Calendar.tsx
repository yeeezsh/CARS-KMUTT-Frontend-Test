import { Col, DatePicker, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import blueSquareIcon from 'Assets/icons/square/blue.svg';
import greySquareIcon from 'Assets/icons/square/grey.svg';
// icons
import orangeSquareIcon from 'Assets/icons/square/orange.svg';
import labelStyles from 'Components/Forms/Common/styles/label';
// interfaces
import TimeNode from 'Components/TimeTable/timetable.interface';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { areaAPI } from 'Services/area';
import Area from 'Services/area/area.interface';
// data store & API
import { RootReducersType } from 'Store/reducers';
import {
  fillForm,
  setAreaInfoForm,
  setFormCurrentIndex,
  submitForm,
} from 'Store/reducers/areaForm/actions';
import adjacentHour from 'Utils/adjacent.hour';
import atleastHour from 'Utils/atleast.hour';
import calendarCurrent from 'Utils/calendar.current';
// utils
import weekParsedHelper from 'Utils/week.parse';

const Button = Loadable({
  loader: () => import('Components/Button'),
  loading: () => null,
});
const TimeTable = Loadable({
  loader: () => import('Components/TimeTable'),
  loading: () => null,
});
const Snackbar = Loadable({
  loader: () => import('Components/Snackbar'),
  loading: () => null,
});

// custom icon
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
const PLACEHOLDER_DATE = 'DD/MM/YYYY';
const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_FORMAT_DASH = 'DD-MM-YYYY';
const TIME_FORMAT = 'HH:mm';
const FULL_TIME_DATE_FORMAT = 'HH:mm-DD-MM-YYYY';
const OFFSET_DAY = 3;
const AREA_PARAM_IND = 5;
const RESERVATION_INTERVAL = 60;

interface Props {
  ind?: number;
}

export interface CalendarForm {
  selected: TimeNode[];
  date: Moment;
  startTime: Moment;
  stopTime: Moment;
}

const Calendar: React.FC<FormComponentProps & Props> = props => {
  const CUR_IND = props.ind || 0;
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const forms = useSelector((s: RootReducersType) => s.AreaFormReducers);
  const initSelectedDate = moment().add(OFFSET_DAY, 'days');
  const areaId = location.split('/')[AREA_PARAM_IND];
  const [selectedDate, setSelecteDate] = useState<Moment>(
    initSelectedDate,
  );
  const [areaState, setAreaState] = useState<Area[]>();
  const [error, setError] = useState<boolean>(false);

  const now = moment(new Date());
  const today = now;
  const selectedWeek = Number(moment(selectedDate).format('E'));

  const { getFieldDecorator } = props.form;

  const data: CalendarForm = forms.forms[CUR_IND];
  const [selected, setSelected] = useState<TimeNode[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSelect(value: Moment, _type: TimeNode['type']) {
    const merge: any = [...selected, { value, type: 'selecting' }].sort(
      (a, b) => a.value.valueOf() - b.value.valueOf(),
    );

    const validSelect = adjacentHour(
      selected,
      value,
      RESERVATION_INTERVAL,
    );

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
      return setSelected(prev => prev.slice(0, duplicatedInd));
    }

    setSelected(merge);
    setError(false);
  }

  function onSubmit() {
    if (!selected[0]) return; // ignore when null
    const atleastOne = atleastHour(selected);
    if (!atleastOne) {
      setError(true);
      return;
    }

    const start = moment(
      `${selected[0].value.format(TIME_FORMAT)}-${selectedDate
        .startOf('day')
        .format(DATE_FORMAT_DASH)}`,
      FULL_TIME_DATE_FORMAT,
    );
    const stop = moment(
      `${selected[selected.length - 1].value.format(
        TIME_FORMAT,
      )}-${selectedDate.startOf('day').format(DATE_FORMAT_DASH)}`,
      FULL_TIME_DATE_FORMAT,
    );

    dispatch(
      fillForm({
        form: {
          selected: selected.map(e => ({
            ...e,
            value: moment(
              `${e.value.format(TIME_FORMAT)}-${selectedDate
                .startOf('day')
                .format(DATE_FORMAT_DASH)}`,
              FULL_TIME_DATE_FORMAT,
            ),
          })),
          date: selectedDate,
          startTime: start,
          stopTime: stop,
        },
        valid: true,
      }),
    );
    dispatch(submitForm());
  }

  // error observation
  useEffect(() => {
    if (error) setTimeout(() => setError(false), 2000);
  }, [error]);

  // once
  useEffect(() => {
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  // selectDate observe
  useEffect(() => {
    areaAPI.getAreaInfo(areaId).then(async a => {
      dispatch(setAreaInfoForm(a));
      const areaFetch = await areaAPI.getAreaAvailableMeeting(
        areaId,
        selectedDate,
      );

      setAreaState([
        {
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
  }, [selectedDate]);

  return (
    <>
      {/* Error Modal */}
      {error && (
        <Snackbar show={true}>
          <p style={{ fontWeight: 'bold' }}>ไม่สามารถจองได้</p>{' '}
          <p>กรุณาจองอย่างน้อย 1 ชั่วโมง หรือชั่วโมงที่ติดกัน</p>
        </Snackbar>
      )}

      <Col span={24}>
        {/* icon detail */}
        <Col span={24}>
          <Row type="flex" justify="center">
            {iconSquare('ว่าง', orangeSquareIcon)}
            {iconSquare('ไม่ว่าง/รอการอนุมัติ', greySquareIcon)}
            {iconSquare('ที่ถูกเลือก', blueSquareIcon)}
          </Row>
        </Col>

        <Col span={24} style={{ margin: 0 }}>
          <Form.Item>
            <p style={labelStyles}>
              ตั้งแต่วันที่
              <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
            </p>

            {getFieldDecorator('date', {
              rules: [{ required: true, message: 'กรุณากรอก' }],
              initialValue:
                data.date || today.add(OFFSET_DAY, 'days').startOf('days'),
            })(
              <DatePicker
                disabledDate={calendarCurrent(OFFSET_DAY)}
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

        {/* Time Selected */}
        <Col span={24} style={{ height: '32px' }}>
          {selected.length < 1 ? (
            <p style={labelStyles}>
              กรุณาเลือกเวลา
              <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
            </p>
          ) : (
            <p
              style={{
                ...labelStyles,
                margin: 0,
                padding: 0,
                marginBottom: 0,
              }}
            >
              เวลา {selected[0].value.format(TIME_FORMAT)} -
              {selected.slice(-1)[0].value.format(TIME_FORMAT)}
            </p>
          )}
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
              .map(e => {
                // skip when day not in
                if (today.valueOf() !== selectedDate?.valueOf()) return e;

                const valueMapped = moment(
                  e.value.format(TIME_FORMAT),
                  TIME_FORMAT,
                ).set('date', Number(selectedDate?.format('DD')));
                const o: TimeNode = {
                  type: 'available',
                  value: valueMapped,
                };
                return o;
              })
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
                  onSelect={onSelect}
                  disabled={disabledMappedAPI}
                  enableEndTrim={false}
                />
              </Col>
            );
          })}
      </Col>

      {/* action */}
      <Col span={24}>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Button onClick={onSubmit}>ต่อไป</Button>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Form.create<FormComponentProps & Props>({
  name: 'calendar',
})(Calendar);
