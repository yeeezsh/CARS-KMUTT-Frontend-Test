import Loading from 'Components/Loading';
import useAreaId from 'Hooks/useAreaId';
import React, { useEffect, useState } from 'react';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';
import { areaService } from 'Services/area/area.service';
import AreaPageFactory from './AreaPageFactory';

const AreaPage: React.FC = () => {
  const [areaInfo, setAreaInfo] = useState<AreaServiceResponseAPI>();
  const areaId = useAreaId();
  useEffect(() => {
    areaService.getAreaInfo(areaId).then(area => setAreaInfo(area));
  }, []);

  const page = (areaInfo && AreaPageFactory(areaInfo.type, areaInfo)) || (
    <div>
      <Loading />
    </div>
  );
  return page;
};

export default AreaPage;
