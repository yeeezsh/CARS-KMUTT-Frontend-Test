import React from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { useLocation } from 'react-router';

const AreaPage: React.FC = props => {
  const { pathname } = useLocation();
  const areaId = pathname.split('/')[3];

  return <StaffLayout>{areaId}</StaffLayout>;
};

export default AreaPage;
