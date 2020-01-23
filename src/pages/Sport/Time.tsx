import React from 'react';
import { Col, Row } from 'antd';

import styles from './styles.module.css';

import BreakingLine from '../../components/BreakingLine';
import Outline from '../../components/Outline';
import BadgeDateSelector from '../../components/BadgeDateSelector';
import TimeTable from '../../components/TimeTable';
import Badge from '../../components/Badge';

import orangeSquareIcon from '../../assets/icons/square/orange.svg';
import greySquareIcon from '../../assets/icons/square/grey.svg';
import blueSquareIcon from '../../assets/icons/square/blue.svg';

import TimeAreaReserveType from '../../models/area/time.interface';
import moment from 'moment';
import WeekParseHelper from './helpers/week.parse';
import TimeNode from '../../components/TimeTable/timetable.interface';

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

const TimePage: React.FunctionComponent<TimeAreaReserveType> = props => {
  const now = moment(new Date());
  const today = now;
  const selectedDate = props.date.selected;
  const selectedWeek = Number(moment(selectedDate).format('E'));

  let reserveSlot: number[] = props.areas.map(e => e.time.interval || 60);
  reserveSlot = reserveSlot.filter((e, i) => reserveSlot.indexOf(e) === i);

  let unit: 'ชั่วโมง' | 'นาที' = 'นาที';
  const useHourUnit = reserveSlot.some(e => e >= 60);
  if (useHourUnit) {
    unit = 'ชั่วโมง';
    reserveSlot = reserveSlot.map(e => e / 60);
  }
  const reserveDesc = reserveSlot.join(', ') + ' ' + unit;
  const { date, onSelectDate } = props;
  return (
    <React.Fragment>
      {/* outliner n' desc */}
      <Col style={{ marginTop: '-10px' }} span={24}>
        <Row type="flex" justify="start">
          {/* outliner */}
          <Outline>เลือกช่วงเวลา</Outline>

          {/* description */}
          <Col className={styles.desc} span={24}>
            <p>เลือกช่วงเวลาที่ต้องการจอง สามารถจองได้ครั้งละ {reserveDesc}</p>
          </Col>

          {/* borderline */}
          <Col span={24}>
            <BreakingLine />
          </Col>
        </Row>

        {/* BadgeDaySelector */}
        <Col span={24}>
          <BadgeDateSelector start={date.start} stop={date.stop} select={date.selected} onSelect={onSelectDate} />
        </Col>
      </Col>

      {/* spacing */}
      <Col span={24}>
        <div style={{ height: '8px' }} />
      </Col>

      {/* Date Outliner */}
      <Col style={{ marginBottom: '-20px' }} span={24}>
        <Row type="flex" justify="center">
          <Badge>
            <span
              style={{
                color: '#FF682B',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              วันที่ {date.selected.format('DD MMMM YYYY')}
            </span>
          </Badge>
        </Row>
      </Col>

      {/* icon detail */}
      <Col span={24}>
        <Row type="flex" justify="center">
          {iconSquare('ว่าง', orangeSquareIcon)}
          {iconSquare('ไม่ว่าง/รอการอนุมัติ', greySquareIcon)}
          {iconSquare('ที่ถูกเลือก', blueSquareIcon)}
        </Row>
      </Col>

      {/* TimeTable */}
      {props.areas &&
        props.areas.map((e, i) => {
          const { area, time } = e;
          const start = moment(time.start).startOf('hour');
          const weekParsed = WeekParseHelper(e.time.week);
          console.log(weekParsed, selectedWeek, weekParsed.includes(selectedWeek));
          if (!weekParsed.includes(selectedWeek)) return null;
          //   return <Col key={`${i}-${selectedDate.format('DD-MM-YYYY')}`} span={24}></Col>;
          // console.log('now', start.format('DD MM YYYY hh-mm'));

          let disabledMapped: TimeNode[] = [];
          const cur = start;
          while (cur <= time.stop) {
            disabledMapped.push({ value: moment(cur), type: 'available' });
            cur.add(time.interval || 60, 'minute');
          }
          disabledMapped.push({ value: moment(cur), type: 'available' });
          disabledMapped = disabledMapped
            .map(e => {
              const valueMapped = moment(e.value.format('HH.mm'), 'HH.mm').set(
                'date',
                Number(selectedDate.format('DD')),
              );
              const disabled: TimeNode = { type: 'disabled', value: moment(valueMapped) };
              // console.log(disabled.value.format('HH:mm DD-MM-YYY'), 'd - t', today.format('HH:mm DD-MM-YYY'));
              // console.log(today.diff(valueMapped));
              const pastDate = today.diff(valueMapped) > 0;
              // console.log('pastdate', pastDate);
              if (pastDate) return disabled;

              return e;
            })
            .filter(({ type }) => type !== 'available');
          // console.log('dsm', disabledMapped);
          // console.log(today, selectedDate.format('DD'), e.time.forward);

          return (
            <Col key={`${i}-${selectedDate.format('DD-MM-YYYY')}`} span={24}>
              <TimeTable
                onClick={() => props.onSelectArea(e.area)}
                title={area.label}
                start={time.start}
                stop={time.stop}
                interval={time.interval || 60}
                onSelect={props.onSelectTime}
                disabled={disabledMapped}
                // disabled={[]}
              />
            </Col>
          );
        })}
    </React.Fragment>
  );
};
export default TimePage;
