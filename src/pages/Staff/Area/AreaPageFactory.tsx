import React from 'react';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import AreaBuildingType from 'Services/area/@types/area.building.type';
import { AreaAPI } from 'Services/area/interfaces';
import AreaPageSportTask from './AreaPageSportTask';

export type AreaPageFactoryType = AreaBuildingType;

// eslint-disable-next-line react/display-name
export default (type: AreaPageFactoryType, area: AreaAPI): JSX.Element => {
  switch (type) {
    case AreaBuildingEnum.sport:
      return <AreaPageSportTask areaInfo={area} />;
    default:
      return <div>type not supported</div>;
  }
};
