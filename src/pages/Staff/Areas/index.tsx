import React, { useEffect, useState } from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { areaAPI } from 'Models/area';
import AreaTable from './table';
import { AreaTableAPI } from 'Models/area/interfaces';

const AreasPages: React.FC = () => {
  const init: AreaTableAPI[] = [];
  const [data, setData] = useState(init);
  useEffect(() => {
    areaAPI.getAreaTable().then(d => setData(d));
  }, []);

  return (
    <StaffLayout>
      <AreaTable data={data} />
    </StaffLayout>
  );
};

export default AreasPages;
