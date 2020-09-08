import { Col, Divider, Row } from 'antd';
import Loading from 'Components/Loading';
import Outline from 'Components/Outline';
import orangeOutline from 'Models/outline/orange.outline';
import moment, { Moment } from 'moment';
import React from 'react';
import weekParse from 'Utils/week.parse';

const lineStyle: React.CSSProperties = {
  margin: 0,
};
interface AreaInfoProps {
  building?: string;
  area?: string;
  time?: {
    start: Moment;
    stop: Moment;
  };
  week?: string;
  forward?: number;
  required?: number;
}

const Data: React.FC<{
  label?: string;
  value?: string | string[] | number;
  unit?: string | string[] | number;
}> = props => {
  return (
    <div style={{ paddingTop: '12px', paddingBottom: '20px' }}>
      <Col span={6}>{props.label}</Col>
      <Col span={18}>
        {props.value ? (
          <p>
            {props.value} {props.unit}
          </p>
        ) : (
          <Loading size={16} />
        )}
      </Col>
    </div>
  );
};

const AreaInfo: React.FC<AreaInfoProps> = props => {
  const week = weekParse(props.week || '');
  return (
    <Col>
      <Row>
        <Outline {...orangeOutline}>ข้อมูลสถานที่</Outline>
      </Row>
      <Row>
        <Data label="สถานที่: " value={props.building} />
      </Row>
      <Divider style={lineStyle} />
      <p>
        <Data label="สนาม / ห้อง: " value={props.area} />
      </p>
      <Divider style={lineStyle} />
      <p>
        <Data
          label="เวลาทำการ:: "
          value={`
      ${props.time?.start && props.time?.start.format('HH:mm')} - ${props
            .time?.stop && props.time?.stop.format('HH:mm')}
      `}
        />
      </p>
      <Divider style={lineStyle} />
      <p>
        <Data
          label="วันทำการ: "
          value={week.map(e => moment(e, 'E').format('dddd') + ', ')}
        />
      </p>
      <Divider style={lineStyle} />
      <p>
        <Data label="จองล่วงหน้าได้: " value={props.forward} unit="วัน" />
      </p>
      <Divider style={lineStyle} />
      <p>
        <Data
          label="ต้องใช้รหัสนักศึกษา: "
          value={props.required}
          unit="คน"
        />
      </p>
      <Divider style={lineStyle} />
    </Col>
  );
};

export default AreaInfo;
