import React, { useEffect, useState } from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { areaAPI } from 'Models/area';
import AreaTable from './table';
import { AreaTableAPI } from 'Models/area/interfaces';

const AreasPages: React.FC = () => {
  const init: AreaTableAPI[] = [];
  const [data, setData] = useState(init);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    areaAPI.getAreaTable().then(d => {
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
