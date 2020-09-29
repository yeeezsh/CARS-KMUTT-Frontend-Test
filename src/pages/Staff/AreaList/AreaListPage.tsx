import StaffLayout from 'Components/Layout/Staff/Home';
import React, { useEffect, useState } from 'react';
import { AreaTableAPI } from 'Services/area/@interfaces/area.interfaces';
import { areaAPI } from 'Services/area/area.service';
import AreaTable from './AreaTable';

const AreaListPage: React.FC = () => {
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

export default AreaListPage;
