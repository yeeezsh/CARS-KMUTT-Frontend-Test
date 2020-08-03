import moment, { Moment } from 'moment';
import React from 'react';

const ReservationMessage: React.FC<{
  msg: string;
  date: Moment;
}> = props => {
  return (
    <div
      style={{
        border: '1px solid #FF682B',
        borderRadius: '4px',
        marginBottom: '12px',
        padding: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '-24px',
        backgroundColor: '#FDE3D4',
      }}
    >
      <span
        style={{
          color: '#666666',
          fontSize: '14px',
          paddingBottom: '4px',
        }}
      >
        ข้อความ
      </span>
      <p
        style={{ color: '#FF682B', fontSize: '14px', fontWeight: 'bold' }}
      >
        {props.msg}
      </p>
      <p
        style={{
          color: '#666666',
          fontSize: '12px',
          paddingBottom: '-12px',
          margin: 0,
        }}
      >
        {moment(props.date).format('DD-MM-YYYY HH:mm')}
      </p>
    </div>
  );
};

export default ReservationMessage;
