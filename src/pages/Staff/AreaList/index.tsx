import StaffLayout from 'Components/Layout/Staff/Home';
import { areaAPI } from 'Models/area';
import { AreaTableAPI } from 'Models/area/interfaces';
import React, { useEffect, useState } from 'react';
import AreaTable from './table';

const AreasPages: React.FC = () => {
  const init: AreaTableAPI[] = [];
  const [data, setData] = useState(init);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    areaAPI.getBuildingTable().then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <StaffLayout>
      <AreaTable data={data} loading={loading} />
    </StaffLayout>
  );
};

export default AreasPages;
