import React, { useEffect } from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { areaAPI } from 'Models/area';

const AreasPages: React.FC = props => {
  useEffect(() => {
    areaAPI.getAreaTable().then(d => console.log(d));
  }, []);
  return <StaffLayout>Areas</StaffLayout>;
};

export default AreasPages;
