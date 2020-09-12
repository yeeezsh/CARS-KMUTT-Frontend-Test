import StaffLayout from 'Components/Layout/Staff/Home';
import React from 'react';
import { AreaAPI } from 'Services/area/interfaces';

const AreaPageCommonMeetingTask: React.FC<{
  areaInfo: AreaAPI;
}> = props => {
  return <StaffLayout>Meeting</StaffLayout>;
};

export default AreaPageCommonMeetingTask;
