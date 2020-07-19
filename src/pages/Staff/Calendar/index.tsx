import { Calendar, Row } from 'antd';
// assets
import calendarIcon from 'Assets/icons/staff/calendar.svg';
import HeadTitle from 'Components/HeadTitle';
import StaffLayout from 'Components/Layout/Staff/Home';
import React from 'react';

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
