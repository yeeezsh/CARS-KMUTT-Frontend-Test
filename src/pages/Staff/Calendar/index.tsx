import React from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { Row, Col, Calendar } from 'antd';
import HeadTitle from 'Components/HeadTitle';

// assets
import calendarIcon from 'Assets/icons/staff/calendar.svg';

const CalendarPages: React.FC = props => {
  return (
    <StaffLayout>
      <Row>
        <HeadTitle icon={calendarIcon} title="ตารางการจอง" />
      </Row>
      <Row>
        <Calendar />
      </Row>
    </StaffLayout>
  );
};

export default CalendarPages;
