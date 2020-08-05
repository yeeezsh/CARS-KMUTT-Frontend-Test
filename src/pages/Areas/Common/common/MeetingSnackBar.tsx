import Snackbar from 'Components/Snackbar';
import React from 'react';

const MeetingSnackBar: React.FC = () => {
  return (
    <Snackbar show={true} interval={5000}>
      <p style={{ fontWeight: 'bold' }}>เวลาดังกล่าวมีผู้ใช้งานแล้ว</p>{' '}
      <p>กรุณาเลือกเวลาใหม่อีกครั้ง</p>
    </Snackbar>
  );
};

export default MeetingSnackBar;
