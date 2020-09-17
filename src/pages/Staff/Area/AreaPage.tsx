import Loading from 'Components/Loading';
import useAreaId from 'Hooks/useAreaId';
import React, { useEffect, useState } from 'react';
import { areaAPI } from 'Services/area';
import { AreaServiceResponseAPI } from 'Services/area/area.interfaces';
import AreaPageFactory from './AreaPageFactory';

const AreaPage: React.FC = () => {
  const [areaInfo, setAreaInfo] = useState<AreaServiceResponseAPI>();
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
