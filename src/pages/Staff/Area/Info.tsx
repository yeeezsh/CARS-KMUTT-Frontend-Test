import { Divider } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';
import weekParse from 'Utils/week.parse';

const lineStyle: React.CSSProperties = {
  margin: 0,
};
const AreaInfo: React.FC<{
  building?: string;
  area?: string;
  time?: {
    start: Moment;
    stop: Moment;
  };
  week?: string;
  forward?: number;
  required?: number;
}> = props => {
  const week = weekParse(props.week || '');
  console.log('week ja', week);
  return (
    <div>
      <p>
        <b>สถานที่:</b> {props.building}
      </p>
      <Divider style={lineStyle} />
      <p>
        <b>สนาม / ห้อง:</b> {props.area}
      </p>
      <Divider style={lineStyle} />
      <p>
        <b>เวลาทำการ:</b>{' '}
        {props.time?.start && props.time?.start.format('HH:mm')} -{' '}
        {props.time?.stop && props.time?.stop.format('HH:mm')}
      </p>
      <Divider style={lineStyle} />
      <p>
        <b>วันทำการ:</b>{' '}
        {week.map(e => moment(e, 'E').format('dddd') + ', ')}
      </p>
      <Divider style={lineStyle} />
      <p>
        <b>จองล่วงหน้าได้:</b> {props.forward} วัน
      </p>
      <Divider style={lineStyle} />
      <p>
        <b>ต้องใช้รหัสนักศึกษา:</b> {props.required} คน
      </p>
      <Divider style={lineStyle} />
    </div>
  );
};

export default AreaInfo;
