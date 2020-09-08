import StaffLayout from 'Components/Layout/Staff/Home';
import React, { useEffect, useState } from 'react';
import { areaAPI } from 'Services/area';
import { AreaTableAPI } from 'Services/area/interfaces';
import AreaTable from './table';

const AreaList: React.FC = () => {
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

export default AreaList;
