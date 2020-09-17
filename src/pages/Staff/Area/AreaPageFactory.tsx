import React from 'react';
import Loadable from 'react-loadable';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import AreaBuildingType from 'Services/area/@types/area.building.type';
import { AreaServiceResponseAPI } from 'Services/area/area.interfaces';

const AreaPageCommonMeetingTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaPageCommonMeetingTask'),
});
const AreaPageSportTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaPageSportTask'),
});

export type AreaPageFactoryType = AreaBuildingType;

// eslint-disable-next-line react/display-name
export default (
  type: AreaPageFactoryType,
  area: AreaServiceResponseAPI,
): JSX.Element => {
  switch (type) {
    case AreaBuildingEnum.sport:
      return <AreaPageSportTask areaInfo={area} />;
    case AreaBuildingEnum.meeting:
      return <AreaPageCommonMeetingTask areaInfo={area} />;
    default:
      return <div>type not supported</div>;
  }
};
