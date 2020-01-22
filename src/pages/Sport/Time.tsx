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
  const today = moment();
  const selectedDate = props.date.selected;

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
          // console.log(today, selectedDate.format('DD'), e.time.forward);
          return (
            <Col key={i} span={24}>
              <TimeTable
                onClick={() => props.onSelectArea(e.area)}
                title={area.label}
                start={time.start}
                stop={time.stop}
                interval={time.interval || 60}
                onSelect={props.onSelectTime}
                // disabled={time.disabled}
                disabled={[]}
              />
            </Col>
          );
        })}
    </React.Fragment>
  );
};
export default TimePage;
