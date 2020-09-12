import Loading from 'Components/Loading';
import useAreaId from 'Hooks/useAreaId';
import React, { useEffect, useState } from 'react';
import { areaAPI } from 'Services/area';
import { AreaAPI } from 'Services/area/interfaces';
import AreaPageFactory from './AreaPageFactory';

const AreaPage: React.FC = () => {
  const [areaInfo, setAreaInfo] = useState<AreaAPI>();
  const areaId = useAreaId();
  useEffect(() => {
    areaAPI.getAreaInfo(areaId).then(area => setAreaInfo(area));
  }, []);

  const page = (areaInfo && AreaPageFactory(areaInfo.type, areaInfo)) || (
    <div>
      <Loading />
    </div>
  );
  return page;
};

export default AreaPage;
